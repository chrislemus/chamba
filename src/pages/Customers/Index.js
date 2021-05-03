import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchAllCustomers } from '../../actions/customersActions';

function Customers({
  customersStatus,
  customersList,
  fetchAllCustomers,
  customers,
}) {
  useEffect(() => {
    if (customersStatus === 'idle') {
      console.log('fetching');
      fetchAllCustomers();
    }
  }, []);

  useEffect(() => {
    console.log(customers);
  });
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
          <div className="field">
            <p className="control has-icons-left has-icons-right is-loading">
              <input
                className="input"
                type="text"
                placeholder="Search ustomers"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </p>
          </div>
        </header>
        <div className="card-content  ">
          <div className="table-container is-fullwidth">
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

              <tbody>
                {customersList.map(
                  (customerInfo) =>
                    customerInfo && (
                      <CustomerListCard customerInfo={customerInfo} />
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    customersList: state.customers.customersList,
    customersStatus: state.customers.status,
    customers: state.customers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCustomers: () => dispatch(fetchAllCustomers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);

const CustomerListCard = (props) => {
  const {
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
            <Link href="/customers/1">{fullName}</Link>
          </div>
        </div>
      </td>
      <td className="is-hidden-mobile">
        <Link href="mailto:mike@me.com">{email}</Link>
      </td>
      <td className="is-hidden-mobile">{phone}</td>
      <td>
        <Link to="/customers/1/edit" className="button is-ghost  ">
          <span className="icon ">
            <i className="fas fa-edit"></i>
          </span>
        </Link>
        <Link to="/customers/1" className="button is-ghost ">
          <span className="icon">
            <i className="fas fa-arrow-right"></i>
          </span>
        </Link>
      </td>
    </tr>
  );
};
