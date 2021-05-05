import { Link } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DataPanelBlocks from '../../iu/DataPanelBlocks';
import { fetchCustomerById } from '../../actions/customerActions';

export default function CustomerDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);
  const { status } = customer;
  const customerData = customer.data;

  useEffect(() => {
    status === 'idle' && dispatch(fetchCustomerById(id));
  }, [status]);

  // useEffect(() => () => dispatch({ type: 'CUSTOMER_RESET_STORE' }), []);

  if (status === 'fetching' || !customerData) {
    return (
      <div className="columns is-centered my-3 ">
        <span className="icon  is-size-3 has-text-primary ">
          <i className="	fas fa-spinner fa-pulse" />
        </span>
      </div>
    );
  }

  const { firstName, lastName } = customerData;
  const customerId = customerData.id;

  const customerContactInfo = [
    { title: 'Email', value: customerData.email },
    { title: 'Mobile Phone', value: customerData.phoneMobile },
    { title: 'Home Phone', value: customerData.phoneHome },
    { title: 'Company Name', value: customerData.companyName },
    { title: 'Address 1', value: customerData.address1 },
    { title: 'Address 2', value: customerData.address2 },
    { title: 'City', value: customerData.city },
    { title: 'State', value: customerData.state },
    { title: 'Zip Code', value: customerData.zipCode },
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
          <article className="panel  has-background-white">
            <p className="panel-heading has-background-white">Client Details</p>
            <DataPanelBlocks data={customerContactInfo} />
          </article>
        </div>
        <div className="column is-6">
          <article className="panel  has-background-white">
            <p className="panel-heading has-background-white">
              Invoices/CheckoutBilling
            </p>
            <DataPanelBlocks data={customerBillingInfo} />
          </article>
        </div>
      </div>
    </>
  );
}
