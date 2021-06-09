import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import DataFetchWrapper from '../../../../components/DataFetchWrapper';
import { fetchInvoiceById, paidInvoice } from '../../../../services/api';
import { useDispatch } from 'react-redux';
import { alertModalError } from '../../../../actions/alertModalActions';
import { format } from 'date-fns';

export default function invoiceData() {
  const router = useRouter();
  const invoiceId = router.query.id;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { status, data } = useQuery(['invoiceData', { invoiceId }], () =>
    fetchInvoiceById(invoiceId)
  );
  const invoice = data?.invoice;
  const customer = invoice?.customer;
  const invoiceLineItems = invoice?.invoiceLineItems;

  const { mutate: markInvoicePaid } = useMutation(
    () => paidInvoice(invoiceId),
    {
      onMutate: async (updatedInvoice) => {
        await queryClient.cancelQueries(['invoiceData', { invoiceId }]);
        const previousData = queryClient.getQueryData([
          'invoiceData',
          { invoiceId },
        ]);
        queryClient.setQueryData(['invoiceData', { invoiceId }], (oldData) => ({
          ...oldData,
          invoice: updatedInvoice,
        }));

        return previousData;
      },
      onError: (error, updatedInvoice, previousData) => {
        dispatch(alertModalError('unable to mark invoice as paid'));
        return queryClient.setQueryData(
          ['invoiceData', { invoiceId }],
          previousData
        );
      },
      // onSuccess: () => {
      //   dispatch(alertModalSuccess('invoice marked as paid'));
      // },
      onSettled: () =>
        queryClient.invalidateQueries(['invoiceData', { invoiceId }]),
    }
  );

  return (
    <DataFetchWrapper
      status={status}
      dataName="Invoice Details"
      hasData={invoice}
    >
      <div className="app-header">
        <div className="app-header-left">
          <h1>Invoice #{invoice?.id}</h1>
        </div>
        <div className="app-header-right">
          <Link href={`/dashboard/invoices/${invoiceId}/edit`}>
            <button className="button is-primary is-rounded">Edit</button>
          </Link>
        </div>
      </div>
      <div className="columns is-multiline box mx-1">
        <div className="column is-6">
          <h1 className="title">{invoice?.businessName}</h1>
        </div>
        <div className="column is-6 ">
          {invoice?.paidDate ? (
            <span className="tag is-success is-large is-light is-pulled-right">
              PAID
            </span>
          ) : (
            <button
              className="button is-success is-lioght is-rounded is-pulled-right"
              onClick={markInvoicePaid}
            >
              Mark as paid
            </button>
          )}
        </div>

        {invoice?.dueDate && (
          <div className="column is-12">
            <p>
              <strong>Due date</strong>:{' '}
              {format(new Date(invoice.dueDate), 'MM/dd/yyyy')}
            </p>
          </div>
        )}
        <div className="column is-12">
          <h6 className="has-text-weight-bold">Billed to</h6>
          {customer && (
            <>
              <Link href={`/dashboard/customers/${customer.id}`}>
                <p>{customer.fullName}</p>
              </Link>
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
              </tr>
            </thead>
            <tbody>
              {invoiceLineItems &&
                invoiceLineItems.map(({ id, name, description, price }) => (
                  <tr key={`InvoiceLineItem-${id}`}>
                    <td>
                      <p>
                        <strong>{name}</strong>
                      </p>
                      {description}
                    </td>
                    <td className=" has-text-right">${price}</td>
                  </tr>
                ))}
              <tr>
                <td className=" has-text-right has-text-weight-bold">Total</td>
                <td className=" has-text-right">${invoice?.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DataFetchWrapper>
  );
}
