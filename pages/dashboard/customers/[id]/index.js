import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import DataFetchWrapper from '../../../../components/DataFetchWrapper';
import { fetchCustomerById } from '../../../../services/api';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ custom }) => ({
  infoBoxesWrapper: { ...custom.infoBoxesWrapper },
  infoBox: { ...custom.infoBox },
  appPageHeader: { ...custom.appPageHeader },
}));

export default function Customer() {
  const classes = useStyles();
  const router = useRouter();
  const customerId = router.query.id;

  const { status, data } = useQuery(['customerData', { customerId }], () =>
    fetchCustomerById(customerId)
  );
  const customer = data?.customer;

  const customerDetails = customer && [
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
  const invoicesOverview = [
    {
      title: 'Paid',
      value: `$${customer?.invoicesOverview?.paidInvoicesTotal}`,
    },
    {
      title: 'Unpaid',
      value: `$${customer?.invoicesOverview?.unpaidInvoicesTotal}`,
    },
  ];

  return (
    <DataFetchWrapper
      status={status}
      dataName="Customer Details"
      hasData={customer}
    >
      <div className={classes.appPageHeader}>
        <div>
          <div aria-label="app-page-header-title">
            <h1>{customer?.fullName}</h1>
          </div>
        </div>
        <div>
          <Link
            href={`/dashboard/customers/${customerId}/edit`}
            passHref={true}
          >
            <Button color="primary" variant="contained">
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <div className={classes.infoBoxesWrapper}>
        <div className={classes.infoBox}>
          <div aria-label="info-box-header">
            <h6>Client Details</h6>
          </div>
          {customer && dataTable(customerDetails)}
        </div>
        <div className={classes.infoBox}>
          <div aria-label="info-box-header">
            <h6>Invoices/CheckoutBilling</h6>
          </div>
          {customer?.invoicesOverview && dataTable(invoicesOverview)}
        </div>
      </div>
    </DataFetchWrapper>
  );
}

function dataTable(data) {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          {data.map(({ title, value }) => (
            <TableRow>
              <TableCell component="th" scope="row">
                <strong>{title}</strong>
              </TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
