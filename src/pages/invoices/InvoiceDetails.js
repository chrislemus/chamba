import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DataPanelBlocks from '../../iu/DataPanelBlocks';

import { useQuery } from 'react-query';
import DataFetchWrapper from '../../components/DataFetchWrapper';
import { fetchInvoiceById } from '../../services/api';

export default function InvoiceDetails() {
  const invoiceId = useParams()?.id;

  const { status, data } = useQuery(['invoiceDetails', {invoiceId}], () =>
    fetchInvoiceById(invoiceId)
  );
  const invoice = data?.invoice

  
  const invoiceLineItems = invoice?.invoiceLineItems
  const getInvoiceData = () => {
    if (!invoiceLineItems) return [];
    if (invoiceLineItems) {
      return invoiceLineItems.map(lineItem => (
        {
          title: 'Id', value: lineItem.description 
        }
      ))

    }
  };



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


          <table className="table mt-5 is-fullwidth ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="is-hidden-mobile has-text-right">Created</th>
                </tr>
              </thead>

              <tbody>


                {invoiceLineItems && invoiceLineItems.map(lineItem => (
                      <tr>
                        <td className="is-hidden-mobile ">fr</td>
                        <td className="is-hidden-mobile has-text-right">fr</td>
                      </tr>
                ))}




              </tbody>

            </table>
        </div>

        {/* <div className="column is-6">
          <article className="panel  has-background-white">
            <p className="panel-heading has-background-white">
              Invoices/CheckoutBilling
            </p>
            <DataPanelBlocks data={customerBillingInfo} />
          </article>
        </div> */}
      </div>
    </DataFetchWrapper>
  );
}
