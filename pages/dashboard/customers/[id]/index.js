import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import DataFetchWrapper from '../../../../components/DataFetchWrapper';
import { fetchCustomerById } from '../../../../services/api';
import { Box, Button, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

export default function Customer() {
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
      <Box display="flex" mb={5}>
        <Box flexGrow={1}>
          <Typography variant="h4">
            <strong>{customer?.fullName}</strong>
          </Typography>
        </Box>
        <Box>
          <Link
            href={`/dashboard/customers/${customerId}/edit`}
            passHref={true}
          >
            <Button color="primary" variant="contained">
              Edit
            </Button>
          </Link>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box bgcolor="white" boxShadow={2} borderRadius={3} width="48%">
          <Box fontSize="h6.fontSize" fontWeight="fontWeightBold" p={2}>
            Client Details
          </Box>
          {customer && dataTable(customerDetails)}
        </Box>
        <Box
          bgcolor="white"
          boxShadow={2}
          borderRadius={3}
          width="48%"
          height="min-content"
        >
          <Box fontSize="h6.fontSize" fontWeight="fontWeightBold" p={2}>
            Invoices/CheckoutBilling
          </Box>
          {customer?.invoicesOverview && dataTable(invoicesOverview)}
        </Box>
      </Box>
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
