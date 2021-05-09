import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useQuery } from 'react-query';
import DataFetchWrapper from '../../components/DataFetchWrapper';
import { createInvoice, fetchCustomers } from '../../services/api';
import { TextField, SelectField, TextArea } from '../../components/formik-ui';
import SubmitButton from '../../iu/SubmitButton';
import { useSelector, useDispatch } from 'react-redux';
import ValidationErrors from '../../iu/ValidationErrors';

import {
  alertModalSuccess,
  alertModalDanger,
} from '../../actions/alertModalActions';

export default function NewInvoice() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formikRef = useRef();
  const invoiceId = useParams()?.id;
  const [customerSearchResults, setCustomerSearchResults] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [customerNameQuery, setCustomerNameQuery] = useState('');
  const [lineItemsIds, setLineItemsIds] = useState([1]);
  const [lineItemIdTracker, setLineItemIdTracker] = useState(1);
  const [validationErrors, setValidationErrors] = useState([]);

  const {
    status: customerStatus,
    data: customerData,
    error: customerError,
  } = useQuery(['customers', { query: customerNameQuery }], () =>
    fetchCustomers(customerNameQuery)
  );

  const customers = customerData?.customers;
  // console.log(customers);

  // const { status, data } = useQuery(['invoiceDetails', { invoiceId }], () =>
  //   fetchInvoiceById(invoiceId)
  // );
  const data = false;
  const invoice = data?.invoice;
  const blankLineItemFields = {
    name: '',
    description: '',
    price: '',
  };

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
    <DataFetchWrapper
      // status={status}
      dataName="Invoice Details"
      hasData={invoice}
    >
      <div className="app-header">
        <div className="app-header-left">
          <h1>Invoice #{invoice?.id}</h1>
        </div>
        <div className="app-header-right">
          <Link
            to={`/invoices/${invoiceId}/edit`}
            className="button is-primary is-rounded"
          >
            Edit
          </Link>
        </div>
      </div>

      <Formik
        innerRef={formikRef}
        initialValues={{
          invoiceLineItemsAttributes: [blankLineItemFields],
        }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          // if (!values.firstName) {
          //   errors.firstName = 'Required';
          // }
          return errors;
        }}
      >
        {(props) => (
          <Form className="columns is-multiline box">
            <ValidationErrors errors={validationErrors} />
            <div className="column is-12">
              <h1 className="title">{invoice?.businessName}</h1>
            </div>
            {invoice?.dueDate && (
              <div className="column is-12">
                <p>
                  <strong>Due date</strong>: {invoice?.dueDate}
                </p>
              </div>
            )}
            <div className="column is-5">
              <div
                className={`dropdown ${customerSearchResults && 'is-active'}`}
              >
                <div className="dropdown-trigger mb-0 pb-0">
                  <input
                    className="input "
                    placeholder="Customer"
                    onChange={({ target }) =>
                      setCustomerNameQuery(target.value)
                    }
                    type="text"
                    onFocus={() => setCustomerSearchResults(true)}
                    onBlur={() => {
                      setTimeout(() => setCustomerSearchResults(false), 100);
                    }}
                  />
                </div>
                <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                  <div className="dropdown-content">
                    {customers?.length > 0 &&
                      customers.map((customer) => (
                        <button
                          key={`customerResult${customer.id}`}
                          type="button"
                          className="dropdown-item button is-ghost"
                          onClick={() => setCustomer(customer)}
                        >
                          {customer.fullName}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
              <ErrorMessage name="customer" />
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
                      <>
                        {props.values.invoiceLineItemsAttributes.map(
                          (lineItem, idx) => (
                            <tr key={'lineItem' + idx}>
                              <td>
                                <TextField
                                  placeholder="Name"
                                  name={`invoiceLineItemsAttributes.${idx}.name`}
                                  type="text"
                                />
                                <TextArea
                                  rows="3"
                                  name={`invoiceLineItemsAttributes.${idx}description`}
                                  type="text"
                                  placeholder="Description"
                                />
                              </td>
                              <td>
                                <TextField
                                  name={`invoiceLineItemsAttributes.${idx}price`}
                                  type="text"
                                />
                              </td>
                              <td>
                                {props.values.invoiceLineItemsAttributes
                                  .length > 1 && (
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
                          )
                        )}
                        <tr>
                          <button
                            type="button"
                            onClick={() =>
                              arrayHelpers.push(blankLineItemFields)
                            }
                            className="button is-info is-inverted ml-3"
                          >
                            <strong>Add item</strong>
                          </button>
                        </tr>
                      </>
                    )}
                  />

                  <tr>
                    <td className=" has-text-right has-text-weight-bold">
                      Total
                    </td>
                    <td className=" has-text-right">${invoice?.total}</td>
                  </tr>
                </tbody>
              </table>
              <SubmitButton
                status={formStatus}
                isValid={props.isValid}
                dirty={props.dirty}
              >
                Save Client
              </SubmitButton>
            </div>
          </Form>
        )}
      </Formik>
    </DataFetchWrapper>
  );
}
