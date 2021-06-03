import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'react-query';
import DataFetchWrapper from '../../../components/DataFetchWrapper';
import Pagination from '../../../components/Pagination';
import { fetchInvoices } from '../../../services/api';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Invoices() {
  const [query, setQuery] = useState('');
  const [pageLimit, setPageLimit] = useState(10);
  const [page, setPage] = useState(1);

  const { status, data } = useQuery(
    ['invoices', { query, pageLimit, page }],
    () => fetchInvoices(query, pageLimit, page)
  );

  const invoices = data?.invoices;
  const queryData = data?.queryData;
  const displayInvoices = () => {
    if (invoices) {
      return invoices.map((invoice) => (
        <InvoiceListCard invoice={invoice} key={`invoice-${invoice.id}`} />
      ));
    }
  };
  return (
    <>
      <div className="app-header">
        <div className="app-header-left">
          <h1>Invoices</h1>
        </div>
        <div className="app-header-right">
          <Link
            href="/dashboard/invoices/new"
            className="button is-primary is-rounded"
          >
            New Invoice
          </Link>
        </div>
      </div>

      <div className="card ">
        <header className="card-header  is-shadowless	pt-4 px-5">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                onChange={({ target }) => setQuery(target.value)}
                placeholder="Search invoices by customer name"
              />

              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </p>
          </div>
        </header>
        <DataFetchWrapper
          status={status}
          dataName={'Invoices'}
          hasData={invoices?.length > 0}
        >
          <>
            <table className="table is-hoverable mt-5 is-fullwidth has-text-centered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="is-hidden-mobile">Created</th>
                  <th className="is-hidden-mobile">Status</th>
                  <th className="is-hidden-mobile">Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>{displayInvoices()}</tbody>
            </table>
            <Pagination
              page={page}
              pageLimit={pageLimit}
              setPage={setPage}
              setPageLimit={setPageLimit}
              totalPages={queryData?.totalPages}
            />
          </>
        </DataFetchWrapper>
      </div>
    </>
  );
}

const InvoiceListCard = ({ invoice }) => {
  const { id, customerFullName, status, total } = invoice;

  const invoiceCreatedDate = format(new Date(invoice.createdAt), 'MM/dd/yyyy');
  const statusStyle = {
    pending: 'info',
    paid: 'success',
    canceled: 'warning',
    overdue: 'danger',
  };

  return (
    <tr>
      <td>
        <Link href={`/dashboard/invoices/${id}`}>{customerFullName}</Link>
      </td>
      <td className="is-hidden-mobile ">{invoiceCreatedDate}</td>
      <td className="is-hidden-mobile">
        <span className={`tag is-${statusStyle[status]} is-light`}>
          {status}
        </span>
      </td>
      <td className="is-hidden-mobile">${total}</td>

      <td>
        <Link href={`/dashboard/invoices/${id}`}>
          <button className="button is-ghost ">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </Link>
      </td>
    </tr>
  );
};
