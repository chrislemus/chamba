import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCustomers } from '../../actions/customerListActions';
// connect(mapStateToProps, mapDispatchToProps)(Customers);

export default function Customers() {
  const dispatch = useDispatch();
  const { customers, status } = useSelector((state) => state.customerList);
  const customerList = useSelector((state) => state.customerList);
  useEffect(() => {
    status === 'idle' && dispatch(fetchCustomers());
  }, [status]);

  const displayCustomers = () =>
    customers.map(
      (customerInfo) =>
        customerInfo && (
          <CustomerListCard
            customerInfo={customerInfo}
            key={`customer-${customerInfo.id}`}
          />
        )
    );

  return (
    <>
      <div className="app-header">
        <div className="app-header-left">
          <h1>Customers</h1>
        </div>
        <div className="app-header-right">
          <Link to="/customers/new" className="button is-primary is-rounded">
            Add Customer
          </Link>
        </div>
      </div>

      <div className="card is-fullwidth">
        <header className="card-header  is-shadowless	pt-4 px-5">
          {customers && (
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Search customers"
                />

                <span className="icon is-small is-left">
                  <i className="fas fa-search"></i>
                </span>
              </p>
            </div>
          )}
        </header>
        {/* <div className="card-content "> */}
        {customers ? (
          <div className="table-container my-5 is-fullwidth">
            <table className="table is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>
                    <span className="icon has-text-grey">
                      <i className="far fa-square"></i>
                    </span>
                  </th>
                  <th>Name</th>
                  <th className="is-hidden-mobile">Email</th>
                  <th className="is-hidden-mobile">Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>{displayCustomers()}</tbody>
            </table>
          </div>
        ) : (
          <div className="columns is-centered my-3 ">
            <span className="icon  is-size-3 has-text-primary ">
              <i className="	fas fa-spinner fa-pulse" />
            </span>
          </div>
        )}
        {/* </div> */}
      </div>
    </>
  );
}

const CustomerListCard = (props) => {
  const {
    id,
    firstName,
    lastName,
    email,
    phoneMobile,
    phoneHome,
    avatar,
  } = props.customerInfo;
  const avatarLink =
    avatar || 'https://bulma.io/images/placeholders/128x128.png';
  const phone = phoneMobile || phoneHome;
  const fullName = lastName ? `${firstName} ${lastName}` : firstName;
  return (
    <tr>
      <td>
        <span className="icon has-text-grey">
          <i className="far fa-square"></i>
        </span>
      </td>
      <td>
        <div className="columns level">
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
