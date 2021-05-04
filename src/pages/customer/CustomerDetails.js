import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DataPanelBlocks from '../../iu/DataPanelBlocks';

import { fetchCustomerById } from '../../actions/customersActions';
export default function CustomerDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { customer, status } = useSelector((state) => state.customers);

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

  const { firstName, lastName } = customer;
  const customerId = customer.id;

  const customerContactInfo = [
    { title: 'Email', value: customer.email },
    { title: 'Mobile Phone', value: customer.phoneMobile },
    { title: 'Home Phone', value: customer.phoneHome },
    { title: 'Company Name', value: customer.companyName },
    { title: 'Address 1', value: customer.address1 },
    { title: 'Address 2', value: customer.address2 },
    { title: 'City', value: customer.city },
    { title: 'State', value: customer.state },
    { title: 'Zip Code', value: customer.zipCode },
  ];

  const customerBillingInfo = [
    { title: 'Paid', value: '$500' },
    { title: 'Draft', value: '$286' },
    { title: 'Unpaid', value: '$41' },
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
            <DataPanelBlocks data={customerContactInfo} />
          </article>
        </div>
        <div className="column is-6">
          <article class="panel  has-background-white">
            <p class="panel-heading has-background-white">
              Invoices/CheckoutBilling
            </p>
            <DataPanelBlocks data={customerBillingInfo} />
          </article>
        </div>
      </div>
    </>
  );
}
