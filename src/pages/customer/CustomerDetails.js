import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DataPanelBlocks from '../../iu/DataPanelBlocks';

import { useQuery } from 'react-query';
import DataFetchWrapper from '../../components/DataFetchWrapper';
import { fetchCustomerById } from '../../services/api';

export default function CustomerDetails() {
  const customerId = useParams()?.id;

  const { status, data } = useQuery(['customerDetails', {customerId}], () =>
    fetchCustomerById(customerId)
  );
  const customer = data?.customer

  const getCustomerData = () => {
    if (!customer) return [];
    if (customer) {
      return [
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
    }
  };

  const customerBillingInfo = [
    { title: 'Paid', value: '$500' },
    { title: 'Draft', value: '$286' },
    { title: 'Unpaid', value: '$41' },
  ];

  return (
    <DataFetchWrapper
      status={status}
      dataName="Customer Details"
      hasData={customer}
    >
      <div className="app-header">
        <div className="app-header-left">
          <h1>{customer?.fullName}</h1>
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
            <DataPanelBlocks data={getCustomerData()} />
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
    </DataFetchWrapper>
  );
}
