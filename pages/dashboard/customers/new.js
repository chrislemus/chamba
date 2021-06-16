import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SubmitButton from '../../../ui/SubmitButton';
import { addNewCustomer } from '../../../services/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { us_states } from '../../../helpers/sharableConst';
import { makeStyles } from '@material-ui/core/styles';
import ValidationErrors from '../../../ui/ValidationErrors';
import { useMutation } from 'react-query';
import { alertModalError } from '../../../actions/alertModalActions';
import {
  TextField,
  FieldGroupWrapper,
  Select,
} from '../../../components/react-hook-form-ui';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Typography, Button } from '@material-ui/core';

const formSelectStateOptions = us_states.map(([stateName, stateAbbr]) => ({
  label: stateName,
  value: stateAbbr,
}));

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2em',
    boxShadow: theme.shadows[2],
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

export default function NewCustomer() {
  const classes = useStyles();
  const reactHookFormMethods = useForm();
  const { formState, handleSubmit } = reactHookFormMethods;
  const router = useRouter();
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState([]);

  const { mutate: createCustomer, status: formStatus } = useMutation(
    addNewCustomer,
    {
      onError: (error) => {
        setValidationErrors(error.validationErrors);
        dispatch(alertModalError('unable to create customer'));
      },
      onSuccess: (data) => {
        const customerId = data?.customer?.id;
        router.push(`/dashboard/customers/${customerId}`);
      },
    }
  );

  return (
    <>
      <Box display="flex" mb={5}>
        <Box flexGrow={1}>
          <Typography variant="h4">
            <strong>New Customer</strong>
          </Typography>
        </Box>
        <Box>
          <Link href="/dashboard/customers">
            <Button variant="outlined" color="primary" onClick={router.back}>
              Cancel
            </Button>
          </Link>
        </Box>
      </Box>

      <FormProvider {...reactHookFormMethods}>
        <form className={classes.form} onSubmit={handleSubmit(createCustomer)}>
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
            Save Client
          </SubmitButton>
        </form>
      </FormProvider>
    </>
  );
}
