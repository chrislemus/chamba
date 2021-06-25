import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { us_states } from '../../../../helpers/sharableConst';
import SubmitButton from '../../../../ui/SubmitButton';
import { Box, Typography, Button } from '@material-ui/core';
import {
  TextField,
  Select,
  FieldGroupWrapper,
} from '../../../../components/react-hook-form-ui';
import {
  alertModalSuccess,
  alertModalError,
} from '../../../../actions/alertModalActions';
import ValidationErrors from '../../../../ui/ValidationErrors';
import {
  editCustomer,
  fetchCustomerById,
  deleteCustomer,
} from '../../../../services/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import DataFetchWrapper from '../../../../components/DataFetchWrapper';
const formSelectStateOptions = us_states.map(([stateName, stateAbbr]) => ({
  label: stateName,
  value: stateAbbr,
}));

const formFieldNames = [
  'firstName',
  'lastName',
  'companyName',
  'email',
  'phoneMobile',
  'phoneHome',
  'address1',
  'address2',
  'city',
  'state',
  'zipCode',
  'country',
];

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2em',
    background: '#fff',
    boxShadow: theme.shadows[2],
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  deleteBtn: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    maxWidth: '200px',
    marginTop: '5rem',
  },
}));

export default function EditCustomer() {
  const classes = useStyles();
  const reactHookFormMethods = useForm();
  const { handleSubmit, formState, setValue } = reactHookFormMethods;
  const router = useRouter();
  const dispatch = useDispatch();

  const customerId = router.query.id;

  const queryClient = useQueryClient();
  const { status, data } = useQuery(
    ['customerData', { customerId }],
    () => customerId && fetchCustomerById(customerId)
  );
  const [validationErrors, setValidationErrors] = useState([]);
  const customer = data?.customer;

  useEffect(() => {
    if (customer?.firstName) {
      formFieldNames.forEach((fieldName) => {
        const fieldValue = customer?.[fieldName];
        fieldValue && setValue(fieldName, fieldValue);
      });
    }
  }, [customer]);

  const { mutate: handleDelete } = useMutation(
    () => deleteCustomer(customerId),
    {
      onError: () => dispatch(alertModalError('unable to delete customer')),
      onSuccess: () => {
        dispatch(alertModalSuccess('customer deleted'));
        router.push('/dashboard/customers');
      },
    }
  );

  const { mutate: updateCustomer, status: formStatus } = useMutation(
    (newCustomerDetails) => editCustomer(customerId, newCustomerDetails),
    {
      onMutate: async (newCustomerDetails) => {
        await queryClient.cancelQueries(['customerData', { customerId }]);
        const previousData = queryClient.getQueryData([
          'customerData',
          { customerId },
        ]);
        queryClient.setQueryData(
          ['customerData', { customerId }],
          (oldData) => ({
            ...oldData,
            customer: newCustomerDetails,
          })
        );

        return previousData;
      },
      onError: (error, newCustomerDetails, previousData) => {
        setValidationErrors(error.validationErrors);
        dispatch(alertModalError('unable to save changes'));
        return queryClient.setQueryData(
          ['customerData', { customerId }],
          previousData
        );
      },
      onSuccess: () => {
        dispatch(alertModalSuccess('customer updated'));
        setValidationErrors([]);
      },
      onSettled: () =>
        queryClient.invalidateQueries(['customerData', { customerId }]),
    }
  );

  return (
    <>
      <Box display="flex" mb={5}>
        <Box flexGrow={1}>
          <Typography variant="h4">
            <strong>Customer Edit</strong>
          </Typography>
        </Box>
        <Box>
          <Button variant="outlined" color="primary" onClick={router.back}>
            Cancel
          </Button>
        </Box>
      </Box>

      <DataFetchWrapper status={status} dataName="Customer" hasData={customer}>
        <FormProvider {...reactHookFormMethods}>
          <form
            className={classes.form}
            onSubmit={handleSubmit(updateCustomer)}
          >
            <ValidationErrors errors={validationErrors} />
            <FieldGroupWrapper>
              <TextField
                name="firstName"
                label="First Name"
                rules={{ required: true }}
                fullWidth
              />
              <TextField name="lastName" label="Last Name" fullWidth />
            </FieldGroupWrapper>
            <TextField name="companyName" label="Company Name" fullWidth />
            <TextField name="email" label="Email" fullWidth />
            <FieldGroupWrapper>
              <TextField
                name="phoneMobile"
                type="tel"
                label="Phone Mobile"
                fullWidth
              />
              <TextField
                name="phoneHome"
                type="tel"
                label="Phone Home"
                fullWidth
              />
            </FieldGroupWrapper>
            <TextField name="address1" label="Address 1" fullWidth />
            <TextField name="address2" label="Address 2" fullWidth />
            <FieldGroupWrapper>
              <TextField name="city" label="City" fullWidth />
              <Select
                name="state"
                label="State/Region"
                options={formSelectStateOptions}
              />
              <TextField name="zipCode" label="Zip Code" fullWidth />
              <TextField
                name="country"
                value="USA"
                disabled
                label="Country"
                fullWidth
              />
            </FieldGroupWrapper>
            <SubmitButton status={formStatus} dirty={formState.isDirty}>
              Save Changes
            </SubmitButton>
            <br />

            <Button
              onClick={handleDelete}
              type="button"
              variant="outlined"
              className={classes.deleteBtn}
            >
              Delete Customer
            </Button>
          </form>
        </FormProvider>
      </DataFetchWrapper>
    </>
  );
}
