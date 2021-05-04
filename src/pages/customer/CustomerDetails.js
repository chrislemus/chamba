import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchCustomerById } from '../customer/../../actions/customersActions';
export default function CustomerDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { customer, status } = useSelector((state) => state.customers);
  console.log(customer);

  useEffect(() => {
    if (status !== 'fetching') {
      dispatch(fetchCustomerById(id));
    }
  }, []);

  if (status === 'fetching' || !customer) {
    return (
      <div className="columns is-centered my-3 ">
        <span class="icon  is-size-3 has-text-primary ">
          <i class="	fas fa-spinner fa-pulse" />
        </span>
      </div>
    );
  }

  const dataPanelBlocks = (data) =>
    data.map((dataInfo) => {
      const [title, info] = dataInfo;

      return (
        <div class="panel-block columns m-0 py-0">
          <div className="has-text-weight-medium column">{title}</div>
          <div className="column">{info || '--'}</div>
        </div>
      );
    });

  const {
    firstName,
    lastName,
    email,
    phoneMobile,
    phoneHome,
    companyName,
    address1,
    address2,
    city,
    state,
    zipCode,
  } = customer;
  const address = `${address1}${address2}${city}${state}${zipCode}`;
  const customerId = customer.id;

  const propsToGet = ['firstName', 'lastName'];

  for (const key in customer) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key];
    }
  }

  const customerData = [
    ['Email', email],
    ['Mobile Phone', phoneMobile],
    ['Home Phone', phoneHome],
    ['Company Name', companyName],
    ['Address', address],
    ['Address 2', address2],
  ];
  return (
    <>
      <div className="app-header">
        <div className="app-header-left">
          <h1>{`${firstName} ${lastName}`}</h1>
        </div>
        <div className="app-header-right">
          <Link
            to={`/customers/${customerId}/edit`}
            className="button is-primary is-rounded"
          >
            Edit
          </Link>
        </div>
      </div>
      <div className="columns is-multiline">
        <div className="column is-6">
          <article class="panel  has-background-white">
            <p class="panel-heading has-background-white">Client Details</p>

            {dataPanelBlocks(customerData)}
          </article>
        </div>
      </div>
    </>
  );
}
