import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import {
  format,
  parseISO,
  differenceInCalendarDays,
  endOfMonth,
} from 'date-fns';
import DataFetchWrapper from '../../../../components/DataFetchWrapper';
import { fetchCustomerById, customerEvents } from '../../../../services/api';
import { Button, Box } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(({ custom, palette, breakpoints }) => ({
  infoBoxesWrapper: { ...custom.infoBoxesWrapper },
  infoBox: { ...custom.infoBox },
  eventInfoBox: { ...custom.infoBox, width: '100%', maxWidth: '800%' },
  appPageHeader: { ...custom.appPageHeader },
  eventTime: {
    display: 'flex',
    color: palette.grey[600],
  },
  dateRangeWrapper: {
    paddingLeft: '1rem',
    display: 'flex',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& div:first-child': {
        marginBottom: '1rem',
      },
    },
    marginTop: '1rem',
    '& div:first-child': {
      marginRight: '1rem',
    },
  },
}));

export default function Customer() {
  const classes = useStyles();
  const router = useRouter();
  const customerId = router.query.id;
  const [eventsStartRange, setEventsStartRange] = useState('2021-01');
  const [eventsEndRange, setEventsEndRange] = useState('2021-12');
  const { status, data } = useQuery(['customerData', { customerId }], () =>
    fetchCustomerById(customerId)
  );
  const daysToGet =
    differenceInCalendarDays(
      endOfMonth(parseISO(eventsEndRange)),
      parseISO(eventsStartRange)
    ) + 1;

  const eventsFetchParams = {
    customerId,
    date: parseISO(eventsStartRange),
    days: daysToGet,
  };
  const { data: eventsRes } = useQuery(
    ['customerEvents', eventsFetchParams],
    () => customerEvents(eventsFetchParams)
  );
  const events = eventsRes?.events;
  const customer = data?.customer;
  const customerHasEvents = events?.length > 0;

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

  const eventsDatePickerControls = [
    ['Start', eventsStartRange, setEventsStartRange],
    ['End', eventsEndRange, setEventsEndRange],
  ];

  const getEventsTableData = () => {
    return events.map(({ title, startDate, endDate }, idx) => {
      startDate = parseISO(startDate);
      endDate = parseISO(endDate);
      const date = format(startDate, 'EEE, LLL d y');
      const time = `${format(startDate, 'p')} - ${format(endDate, 'p')}`;
      return (
        <TableRow key={`data-customer-index-events-${idx}`}>
          <TableCell component="th" scope="row">
            <p>
              <strong>{date}</strong>
            </p>
            <p className={classes.eventTime}>
              <AccessTimeIcon
                fontSize="small"
                style={{ marginRight: '.2rem' }}
              />
              {time}
            </p>
          </TableCell>
          <TableCell>{title}</TableCell>
        </TableRow>
      );
    });
  };

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
        <div className={classes.eventInfoBox}>
          <div aria-label="info-box-header">
            <h6>Events</h6>
          </div>

          {customerHasEvents ? (
            <>
              <Box className={classes.dateRangeWrapper}>
                {eventsDatePickerControls.map(
                  ([label, value, onChange], idx) => (
                    <TextField
                      key={`event-date-range-${idx}`}
                      type="month"
                      label={label}
                      variant="outlined"
                      size="small"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )
                )}
              </Box>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableBody>{getEventsTableData()}</TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <p style={{ paddingLeft: '1rem' }}>No Events</p>
          )}
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
            <TableRow key={`data-customer-index-${title}`}>
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
