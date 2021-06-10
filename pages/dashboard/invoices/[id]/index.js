import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseISO, format } from 'date-fns';
import { Box, Button, Typography, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PriceLineItemsStatic from '../../../../components/PriceLineItemsStatic';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import DataFetchWrapper from '../../../../components/DataFetchWrapper';
import { fetchInvoiceById, paidInvoice } from '../../../../services/api';
import { useDispatch } from 'react-redux';
import { alertModalError } from '../../../../actions/alertModalActions';

const useStyles = makeStyles(({ palette }) => ({
  paidButton: {
    backgroundColor: palette.success.main,
    color: '#fff',
  },
  paidChip: {
    backgroundColor: palette.success.lighter,
    color: palette.success.main,
  },
}));

export default function invoiceData() {
  const classes = useStyles();
  const router = useRouter();
  const invoiceId = router.query.id;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { status, data } = useQuery(['invoiceData', { invoiceId }], () =>
    fetchInvoiceById(invoiceId)
  );
  const invoice = data?.invoice;
  const customer = invoice?.customer;
  const invoiceLineItems = invoice?.invoiceLineItems;

  const { mutate: markInvoicePaid } = useMutation(
    () => paidInvoice(invoiceId),
    {
      onMutate: async (updatedInvoice) => {
        await queryClient.cancelQueries(['invoiceData', { invoiceId }]);
        const previousData = queryClient.getQueryData([
          'invoiceData',
          { invoiceId },
        ]);
        queryClient.setQueryData(['invoiceData', { invoiceId }], (oldData) => ({
          ...oldData,
          invoice: updatedInvoice,
        }));

        return previousData;
      },
      onError: (error, updatedInvoice, previousData) => {
        dispatch(alertModalError('unable to mark invoice as paid'));
        return queryClient.setQueryData(
          ['invoiceData', { invoiceId }],
          previousData
        );
      },
      onSuccess: () => dispatch(alertModalSuccess('invoice marked as paid')),
      onSettled: () =>
        queryClient.invalidateQueries(['invoiceData', { invoiceId }]),
    }
  );

  return (
    <DataFetchWrapper
      status={status}
      dataName="Invoice Details"
      hasData={invoice}
    >
      <Box display="flex" mb={5}>
        <Box flexGrow={1}>
          <Typography variant="h4">
            <strong>Invoice #{invoice?.id}</strong>
          </Typography>
        </Box>
        <Box>
          <Link href={`/dashboard/invoices/${invoiceId}/edit`}>
            <Button color="primary" variant="contained">
              Edit
            </Button>
          </Link>
        </Box>
      </Box>
      <Box bgcolor="white" boxShadow={2} borderRadius={3} py={6} px={5}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography variant="h4">
              <strong>{invoice?.businessName}</strong>
            </Typography>
          </Box>
          <Box>
            {invoice?.paidDate ? (
              <Chip label="PAID" className={classes.paidChip} />
            ) : (
              <Button
                variant="contained"
                onClick={markInvoicePaid}
                className={classes.paidButton}
              >
                Mark as paid
              </Button>
            )}
          </Box>
        </Box>

        {invoice?.dueDate && (
          <Box mt={3}>
            <Typography>
              <strong>Due date</strong>:{' '}
              {format(parseISO(invoice.dueDate), 'MM/dd/yyyy')}
            </Typography>
          </Box>
        )}
        <Box mt={3}>
          <Typography variant="h6">Billed to</Typography>
          {customer && (
            <>
              <Link href={`/dashboard/customers/${customer.id}`}>
                <a>{customer.fullName}</a>
              </Link>
              <p>{customer.address1}</p>
              <p>{customer.address2}</p>
              <p>
                {customer.city} {customer.state} {customer.zipCode}
              </p>
            </>
          )}
        </Box>

        <Box mt={3}>
          <PriceLineItemsStatic lineItems={invoiceLineItems} />
        </Box>
      </Box>
    </DataFetchWrapper>
  );
}
