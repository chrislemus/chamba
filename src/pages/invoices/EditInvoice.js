import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useQuery } from 'react-query';
import DataFetchWrapper from '../../components/DataFetchWrapper';
import { fetchInvoiceById } from '../../services/api';

export default function InvoiceDetails() {
  const invoiceId = useParams()?.id;

  const { status, data } = useQuery(['invoiceDetails', { invoiceId }], () =>
    fetchInvoiceById(invoiceId)
  );
  const invoice = data?.invoice;
  const customer = invoice?.customer;
  const invoiceLineItems = invoice?.invoiceLineItems;

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
          <Link
            to={`/invoices/${invoiceId}/edit`}
            className="button is-primary is-rounded"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="columns is-multiline box">
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
                <th>Description</th>
                <th className=" has-text-right is-narrow">Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {invoiceLineItems &&
                invoiceLineItems.map(({ id, description, price }) => (
                  <tr key={`InvoiceLineItem-${id}`}>
                    <td>{description}</td>
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
