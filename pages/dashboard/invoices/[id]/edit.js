import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import DataFetchWrapper from '../../../../components/DataFetchWrapper';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  editInvoice,
  fetchInvoiceById,
  deleteInvoice,
} from '../../../../services/api';
import {
  PricedLineItems,
  TextField,
  Checkbox,
} from '../../../../components/react-hook-form-ui';
import SubmitButton from '../../../../ui/SubmitButton';
import ValidationErrors from '../../../../ui/ValidationErrors';
import {
  alertModalSuccess,
  alertModalError,
} from '../../../../actions/alertModalActions';

const useStyles = makeStyles((theme) => ({
  form: {
    background: '#fff',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[2],
    borderRadius: '5px',
    flexWrap: 'wrap',
    padding: '2em',
  },
  deleteBtn: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    maxWidth: '150px',
    marginTop: '5rem',
  },
}));

export default function EditInvoice() {
  const classes = useStyles();
  const [invoiceId, setInvoiceId] = useState(undefined);
  const reactHookFormMethods = useForm();
  const { handleSubmit, setValue: setFormValue } = reactHookFormMethods;
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const id = router.query?.id;
    if (id) setInvoiceId(id);
  }, [router.query.id]);
  const queryClient = useQueryClient();
  const [validationErrors, setValidationErrors] = useState([]);
  const { status, data } = useQuery(['invoiceData', { invoiceId }], () => {
    if (invoiceId) return fetchInvoiceById(invoiceId);
  });
  const invoiceData = data?.invoice;
  const customer = invoiceData?.customer;

  useEffect(() => {
    let invoiceLineItems = invoiceData?.invoiceLineItems;
    if (invoiceLineItems) {
      let { dueDate, canceled } = invoiceData;
      if (dueDate) setFormValue('dueDate', dueDate.split('T')[0]);
      if (canceled) setFormValue('canceled', canceled);
      invoiceLineItems = invoiceLineItems.map(
        ({ id, name, description, price }) => ({ id, name, description, price })
      );
      setFormValue('invoiceLineItemsAttributes', invoiceLineItems);
    }
  }, [invoiceData]);

  const { mutate: onSubmit, status: formStatus } = useMutation(
    (updatedInvoice) => editInvoice(invoiceId, updatedInvoice),
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
        setValidationErrors(error.validationErrors);
        dispatch(alertModalError('unable to save changes'));
        return queryClient.setQueryData(
          ['invoiceData', { invoiceId }],
          previousData
        );
      },
      onSuccess: () => {
        dispatch(alertModalSuccess('invoice updated'));
        setValidationErrors([]);
      },
      onSettled: () =>
        queryClient.invalidateQueries(['invoiceData', { invoiceId }]),
    }
  );
  const { mutate: handleDelete } = useMutation(() => deleteInvoice(invoiceId), {
    onError: () => dispatch(alertModalError('unable to delete invoice')),
    onSuccess: () => {
      dispatch(alertModalSuccess('invoice deleted'));
      router.push('/dashboard/invoices');
    },
  });

  return (
    <DataFetchWrapper
      dataName="Invoice Details"
      status={status}
      hasData={invoiceData}
    >
      <Box display="flex" mb={5}>
        <Box flexGrow={1}>
          <Typography variant="h4">
            <strong>Invoice #{invoiceData?.id}</strong>
          </Typography>
        </Box>
        <Box>
          <Button color="primary" variant="contained" onClick={router.back}>
            Cancel
          </Button>
        </Box>
      </Box>

      <FormProvider {...reactHookFormMethods}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5">
            <strong>{invoiceData?.businessName}</strong>
          </Typography>

          <Box display="flex" justifyContent="space-between">
            <div>
              <h6>
                <strong>Billed to</strong>
              </h6>
              {customer && (
                <>
                  <p>{customer.fullName}</p>
                  <p>{customer.address1}</p>
                  <p>{customer.address2}</p>
                  <p>
                    {customer.city} {customer.state} {customer.zipCode}
                  </p>
                </>
              )}
            </div>
            <div>
              <TextField
                name="dueDate"
                type="date"
                label="Due Date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Box mt={4}>
                <Checkbox name="canceled" label="Mark invoice as canceled" />
              </Box>
            </div>
          </Box>

          <ValidationErrors errors={validationErrors} />
          {invoiceData?.invoiceLineItems && (
            <Box my={5}>
              <PricedLineItems fieldArrayName={'invoiceLineItemsAttributes'} />
            </Box>
          )}

          <SubmitButton status={formStatus}>Save Changes</SubmitButton>
          <Button
            onClick={handleDelete}
            variant="outlined"
            className={classes.deleteBtn}
            type="button"
          >
            Delete Invoice
          </Button>
        </form>
      </FormProvider>
    </DataFetchWrapper>
  );
}
