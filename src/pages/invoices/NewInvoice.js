import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import { Formik, Form, FieldArray, ErrorMessage, Field } from 'formik';
import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useQuery } from 'react-query';
import DataFetchWrapper from '../../components/DataFetchWrapper';
import { createInvoice, fetchCustomers } from '../../services/api';
import { TextField, TextArea } from '../../components/formik-ui';
import SubmitButton from '../../iu/SubmitButton';
import ValidationErrors from '../../iu/ValidationErrors';

const blankLineItemFields = {
  name: '',
  description: '',
  price: '0',
};

export default function NewInvoice() {
  const history = useHistory();
  const formikRef = useRef();
  const [isCustomersDropdownHidden, setIsCustomersDropdownHidden] = useState(
    true
  );
  const [customer, setCustomer] = useState(null);
  const [customerNameQuery, setCustomerNameQuery] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const { data: customerData } = useQuery(
    ['customers', { query: customerNameQuery }],
    () => fetchCustomers(customerNameQuery)
  );



  const { mutate: handleSubmit, status: formStatus } = useMutation(
    (invoice) => createInvoice({ ...invoice, customerId: customer?.id }),
    {
      onError: (error) => {
        setValidationErrors(error.validationErrors);
      },
      onSuccess: (data) => {
        const invoiceId = data?.invoice?.id;
        history.push(`/invoices/${invoiceId}`);
      },
    }
  );

  return (
    <DataFetchWrapper dataName="Invoice Details" >
      <div className="app-header">
        <div className="app-header-left">
          <h1>New Invoice</h1>
        </div>
        <div className="app-header-right">
          <button
            onClick={() => history.goBack()}
            className="button is-primary is-rounded"
          >
            Cancel
          </button>
        </div>
      </div>

      <Formik
        innerRef={formikRef}
        initialValues={{
          customer: '',
          invoiceLineItemsAttributes: [blankLineItemFields],
        }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          if (values.customer.length === 0)
            errors.customer = 'Customer required';
          //line items validation
          let validLineItems = true;
          const invoiceLineItemsAttributes = values.invoiceLineItemsAttributes.map(
            (lineItem) => {
              let lineItemErrors = {};
              if (lineItem.name.length === 0) {
                validLineItems = false;
                lineItemErrors.name = 'Item name is required';
              }
              return lineItemErrors;
            }
          );

          if (!validLineItems)
            errors.invoiceLineItemsAttributes = invoiceLineItemsAttributes;

          return errors;
        }}
      >
        {({ setFieldValue, values, dirty }) => (
          <Form className="columns is-multiline box box mx-1">
            <ValidationErrors errors={validationErrors} />


            <div className="column is-5">
              <div
                className={`dropdown ${
                  !isCustomersDropdownHidden && 'is-active'
                }`}
              >
                <div className="dropdown-trigger mb-0 pb-0">
                  <input
                    className="input "
                    placeholder="Customer"
                    disabled={!!customer}
                    onChange={({ target }) =>
                      setCustomerNameQuery(target.value)
                    }
                    type="text"
                    onFocus={() => setIsCustomersDropdownHidden(false)}
                    onBlur={() =>
                      setTimeout(() => setIsCustomersDropdownHidden(true), 200)
                    }
                  />
                </div>
                <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                  <div className="dropdown-content">
                    {customerData?.customers?.length > 0 &&
                      customerData.customers.map((customer) => (
                        <button
                          key={`customerResult${customer.id}`}
                          type="button"
                          className="dropdown-item button is-ghost"
                          onClick={() => {
                            setCustomer(customer);
                            setFieldValue('customer', customer.id);
                          }}
                        >
                          {customer.fullName}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
              <Field name="customer" type="hidden" />

              <ErrorMessage
                className="help is-danger"
                name="customer"
                component="span"
              />
            </div>

            <div className="column is-12">
              <h6 className="has-text-weight-bold">Billed to</h6>
              {customer && (
                <>
                  <p>{customer.fullName}</p>
                  <p>{customer.address1}</p>
                  <p>{customer.address2}</p>
                  <p>
                    {customer.city} {customer.state} {customer.zipCode}
                  </p>
                </>
              )}
            </div>

            <div className="column is-12">
              <table className="table mt-5 is-fullwidth ">
                <thead>
                  <tr>
                    <th>Product/Service</th>
                    <th className=" has-text-right is-narrow">Unit Price</th>
                    <th className=" is-narrow"></th>
                  </tr>
                </thead>
                <tbody>
                  <FieldArray
                    name="invoiceLineItemsAttributes"
                    render={(arrayHelpers) => (
                      <LineItems
                        invoiceLineItemsAttributes={
                          values.invoiceLineItemsAttributes
                        }
                        setFieldValue={setFieldValue}
                        arrayHelpers={arrayHelpers}
                      />
                    )}
                  />

                  <tr>
                    <td className=" has-text-right has-text-weight-bold">
                      Total
                    </td>
                    <td className=" has-text-right">
                      $
                      {values.invoiceLineItemsAttributes
                        .reduce(
                          (accu, curr) =>
                            parseFloat(accu) + parseFloat(curr.price),
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <SubmitButton status={formStatus} dirty={dirty}>
                Create Invoice
              </SubmitButton>
            </div>
          </Form>
        )}
      </Formik>
    </DataFetchWrapper>
  );
}

///Line Items input
function LineItems({
  invoiceLineItemsAttributes,
  arrayHelpers,
  setFieldValue,
}) {
  if (!invoiceLineItemsAttributes) return null;

  return (
    <>
      {invoiceLineItemsAttributes.map((lineItem, idx) => (
        <tr key={'lineItem' + idx}>
          <td>
            <TextField
              placeholder="Name"
              name={`invoiceLineItemsAttributes.${idx}.name`}
              type="text"
            />
            <TextArea
              rows="3"
              name={`invoiceLineItemsAttributes.${idx}.description`}
              type="text"
              placeholder="Description"
            />
          </td>
          <td>
            <TextField
              name={`invoiceLineItemsAttributes.${idx}.price`}
              onBlur={({ target }) => {
                const fieldName = `invoiceLineItemsAttributes.${idx}.price`;
                let price = target.value;
                price = price.match(/^\d+(\.\d+)?$/)
                  ? parseFloat(price).toFixed(2)
                  : 0;
                setFieldValue(fieldName, price);
              }}
              type="text"
            />
          </td>
          <td>
            {invoiceLineItemsAttributes.length > 1 && (
              <button
                type="button"
                onClick={() => arrayHelpers.remove(idx)}
                className="button is-ghost has-text-danger"
              >
                <span className="icon">
                  <i className="far fa-trash-alt" />
                </span>
              </button>
            )}
          </td>
        </tr>
      ))}
      <tr>
        <button
          type="button"
          onClick={() => arrayHelpers.push(blankLineItemFields)}
          className="button is-info is-inverted ml-3"
        >
          <strong>Add item</strong>
        </button>
      </tr>
    </>
  );
}
