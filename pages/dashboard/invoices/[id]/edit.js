import Link from 'next/link';
import { useRouter } from 'next/router';
// import { useParams, useHistory } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import { format } from 'date-fns';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import DataFetchWrapper from '../../../../components/DataFetchWrapper';
import {
  editInvoice,
  fetchInvoiceById,
  deleteInvoice,
} from '../../../../services/api';
import { TextField, TextArea } from '../../../../components/formik-ui';
import SubmitButton from '../../../../ui/SubmitButton';
import ValidationErrors from '../../../../ui/ValidationErrors';
import {
  alertModalSuccess,
  alertModalDanger,
} from '../../../../actions/alertModalActions';

const blankLineItemFields = {
  name: '',
  description: '',
  price: '0',
};

export default function NewInvoice() {
  const dispatch = useDispatch();
  const router = useRouter();
  const invoiceId = router.query.id;
  const [lineItemsToDelete, setLineItemsToDelete] = useState([]);
  const queryClient = useQueryClient();
  const [validationErrors, setValidationErrors] = useState([]);
  const formikRef = useRef();
  const { status, data } = useQuery(['invoiceDetails', { invoiceId }], () =>
    fetchInvoiceById(invoiceId)
  );
  const invoiceData = data?.invoice;
  const customer = invoiceData?.customer;
  const invoiceLineItems = invoiceData?.invoiceLineItems;

  useEffect(() => {
    const resetForm = formikRef.current?.resetForm;
    if (invoiceData && invoiceLineItems?.length && resetForm) {
      const filteredLineItems = invoiceLineItems.map(
        ({ id, name, description, price }) => ({ id, name, description, price })
      );

      let dueDate = invoiceData?.dueDate;
      dueDate = dueDate ? format(new Date(dueDate), 'yyyy-MM-dd') : '';

      resetForm({
        values: {
          canceledDate: invoiceData.canceledDate,
          dueDate,
          invoiceLineItemsAttributes: filteredLineItems,
        },
      });
    }
  }, [invoiceData]);

  const { mutate: handleSubmit, status: formStatus } = useMutation(
    (updatedInvoice) => {
      updatedInvoice.invoiceLineItemsAttributes =
        updatedInvoice.invoiceLineItemsAttributes.map((lineItem) => ({
          ...lineItem,
          _destroy: lineItemsToDelete.includes(lineItem.id),
        }));
      const { dueDate } = updatedInvoice;
      updatedInvoice.dueDate =
        dueDate.length > 0 ? new Date(dueDate).toISOString() : '';
      console.log(updatedInvoice);
      return editInvoice(invoiceId, updatedInvoice);
    },
    {
      onMutate: async (updatedInvoice) => {
        await queryClient.cancelQueries(['invoiceDetails', { invoiceId }]);
        const previousData = queryClient.getQueryData([
          'invoiceDetails',
          { invoiceId },
        ]);
        queryClient.setQueryData(
          ['invoiceDetails', { invoiceId }],
          (oldData) => ({
            ...oldData,
            invoice: updatedInvoice,
          })
        );

        return previousData;
      },
      onError: (error, updatedInvoice, previousData) => {
        setValidationErrors(error.validationErrors);
        dispatch(alertModalDanger('unable to save changes'));
        return queryClient.setQueryData(
          ['invoiceDetails', { invoiceId }],
          previousData
        );
      },
      onSuccess: () => {
        dispatch(alertModalSuccess('invoice updated'));
        setValidationErrors([]);
      },
      onSettled: () =>
        queryClient.invalidateQueries(['invoiceDetails', { invoiceId }]),
    }
  );
  const { mutate: handleDelete } = useMutation(() => deleteInvoice(invoiceId), {
    onError: (error, updatedInvoice, previousData) => {
      dispatch(alertModalDanger('unable to delete invoice'));
    },
    onSuccess: () => {
      dispatch(alertModalSuccess('invoice deleted'));
      router.push('/dashboard/invoices');
    },
  });

  return (
    <DataFetchWrapper
      dataName="Invoice Details"
      status={status}
      hasData={invoiceData}
    >
      <div className="app-header">
        <div className="app-header-left">
          <h1>Invoice #{invoiceData?.id}</h1>
        </div>
        <div className="app-header-right">
          <button
            onClick={() => router.back()}
            className="button is-primary is-rounded"
          >
            Cancel
          </button>
        </div>
      </div>

      <Formik
        innerRef={formikRef}
        initialValues={{
          canceledDate: '',
          dueDate: '',
          invoiceLineItemsAttributes: [blankLineItemFields],
        }}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};

          //line items validation
          let validLineItems = true;
          const invoiceLineItemsAttributes =
            values.invoiceLineItemsAttributes.map((lineItem) => {
              let lineItemErrors = {};
              if (lineItem.name.length === 0) {
                validLineItems = false;
                lineItemErrors.name = 'Item name is required';
              }
              return lineItemErrors;
            });

          if (!validLineItems)
            errors.invoiceLineItemsAttributes = invoiceLineItemsAttributes;

          return errors;
        }}
      >
        {({ setFieldValue, values, dirty }) => (
          <Form className="columns is-multiline box box mx-1">
            <ValidationErrors errors={validationErrors} />
            <div className="column is-12">
              <h1 className="title">{invoiceData?.businessName}</h1>
            </div>

            <div className="column">
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
            <div className="column is-narrow ">
              <TextField name="dueDate" type="date" label="Due Date" />
              <TextField name="canceledDate" type="hidden" />
              <label className="checkbox">
                <input
                  checked={values.canceledDate?.length > 0}
                  onChange={({ target }) => {
                    if (target.checked) {
                      setFieldValue('canceledDate', new Date().toISOString());
                    } else {
                      setFieldValue('canceledDate', '');
                    }
                  }}
                  type="checkbox"
                />{' '}
                Mark invoice as canceled
              </label>
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
                        lineItemsToDelete={lineItemsToDelete}
                        setLineItemsToDelete={setLineItemsToDelete}
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

              <SubmitButton status={formStatus}>Save Changes</SubmitButton>
              <br />
              <button
                onClick={handleDelete}
                className="mt-5 button is-danger is-outlined is-rounded"
                type="button"
              >
                Delete Invoice
              </button>
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
  lineItemsToDelete,
  setLineItemsToDelete,
}) {
  if (!invoiceLineItemsAttributes) return null;
  return (
    <>
      {invoiceLineItemsAttributes.map((lineItem, idx) =>
        lineItemsToDelete.includes(lineItem.id) ? null : (
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
                  onClick={() => {
                    if (lineItem.id) {
                      setLineItemsToDelete([...lineItemsToDelete, lineItem.id]);
                    } else {
                      arrayHelpers.remove(idx);
                    }
                  }}
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
          onClick={() => arrayHelpers.push(blankLineItemFields)}
          className="button is-info is-inverted ml-3"
        >
          <strong>Add item</strong>
        </button>
      </tr>
    </>
  );
}
