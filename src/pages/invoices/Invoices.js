import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCustomers } from '../../actions/customerListActions';
import DataFetchWrapper from '../../components/DataFetchWrapper';
import Pagination from '../../components/Pagination';

export default function Invoices() {
  const [query, setQuery] = useState('');
  const [pageLimit, setPageLimit] = useState(10);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { customers, status, queryData } = useSelector(
    (state) => state.customerList
  );

  const fetchCustomerList = () => {
    dispatch(fetchCustomers(query, pageLimit, page));
  };

  //component mount data fetching
  useEffect(() => {
    status === 'idle' && fetchCustomerList();
  }, [status]);

  //query data fetching
  useEffect(() => fetchCustomerList(), [pageLimit, page, query]);

  const displayCustomers = () => {
    if (customers) {
      return customers.map(
        (customerInfo) =>
          customerInfo && (
            <CustomerListCard
              customerInfo={customerInfo}
              key={`customer-${customerInfo.id}`}
            />
          )
      );
    }
  };

  return (
    <>
      <div className="app-header">
        <div className="app-header-left">
          <h1>Invoices</h1>
        </div>
        <div className="app-header-right">
          <Link to="/customers/new" className="button is-primary is-rounded">
            Add Customer
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
                placeholder="Search customers"
              />

              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </p>
          </div>
        </header>
        <DataFetchWrapper
          status={status}
          dataName={'Customers'}
          queryData={queryData}
        >
          <>
            <table className="table is-hoverable mt-5 is-fullwidth">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="is-hidden-mobile">Email</th>
                  <th className="is-hidden-mobile">Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>{displayCustomers()}</tbody>
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

const CustomerListCard = (props) => {
  const {
    id,
    fullName,
    email,
    phoneMobile,
    phoneHome,
    avatar,
  } = props.customerInfo;
  const avatarLink =
    avatar || 'https://bulma.io/images/placeholders/128x128.png';
  const phone = phoneMobile || phoneHome;
  return (
    <tr>
      <td>
        <div className="columns is-mobile level">
          <div className="column is-narrow">
            <p className="image is-32x32">
              <img className="is-rounded" src={avatarLink} />
            </p>
          </div>
          <div className="column">
            <Link to={`/customers/${id}`}>{fullName}</Link>
          </div>
        </div>
      </td>
      <td className="is-hidden-mobile">
        {!!email?.length ? (
          <a href={`mailto:${email}`} target="_blank">
            {email}
          </a>
        ) : (
          '--'
        )}
      </td>
      <td className="is-hidden-mobile">{phone ? phone : '--'}</td>
      <td>
        <Link to={`/customers/${id}/edit`} className="button is-ghost  ">
          <span className="icon ">
            <i className="fas fa-edit"></i>
          </span>
        </Link>
        <Link to={`/customers/${id}`} className="button is-ghost ">
          <span className="icon">
            <i className="fas fa-arrow-right"></i>
          </span>
        </Link>
      </td>
    </tr>
  );
};
