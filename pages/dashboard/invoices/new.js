import { useRouter } from 'next/router';
import { Box, TextField, Button, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm, FormProvider, useController } from 'react-hook-form';
import { PricedLineItems } from '../../../components/react-hook-form-ui';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import DataFetchWrapper from '../../../components/DataFetchWrapper';
import { createInvoice, fetchCustomers } from '../../../services/api';
import SubmitButton from '../../../ui/SubmitButton';
import ValidationErrors from '../../../ui/ValidationErrors';

export default function NewInvoice() {
  const reactHookFormMethods = useForm();
  const [customersDropdownActive, setCustomersDropdownActive] = useState(false);
  const {
    handleSubmit,
    setValue: setFieldValue,
    formState,
    control,
  } = reactHookFormMethods;
  const { isDirty } = formState;
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [customerNameQuery, setCustomerNameQuery] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  useEffect(() => {
    if (customer?.id) setFieldValue('customerId', customer.id);
  }, [customer]);

  const {
    field: { ref },
    fieldState: { invalid: invalidCustomerSelect },
  } = useController({
    name: 'customerId',
    control,
    rules: { required: true },
  });
  const { data, isLoading } = useQuery(
    ['customers', { query: customerNameQuery }],
    () => fetchCustomers(customerNameQuery)
  );
  const customers = data?.customers;
  const { mutate: onSubmit, status: formStatus } = useMutation(
    (invoice) => createInvoice({ ...invoice, customerId: customer?.id }),
    {
      onError: (error) => setValidationErrors(error.validationErrors),
      onSuccess: (data) =>
        router.push(`/dashboard/invoices/${data?.invoice?.id}`),
    }
  );

  return (
    <DataFetchWrapper dataName="Invoice Details">
      <Box display="flex" mb={5}>
        <Box flexGrow={1}>
          <Typography variant="h4">
            <strong>New Invoice</strong>
          </Typography>
        </Box>
        <Box>
          <Button onClick={router.back} color="primary" variant="contained">
            Cancel
          </Button>
        </Box>
      </Box>

      <FormProvider {...reactHookFormMethods}>
        <Box bgcolor="white" boxShadow={2} borderRadius={3} py={6} px={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ValidationErrors errors={validationErrors} />

            <Box px={3} pb={5} maxWidth={200}>
              <Autocomplete
                size="small"
                onChange={(_0, customer) => setCustomer(customer)}
                open={customersDropdownActive}
                onOpen={() => setCustomersDropdownActive(true)}
                forcePopupIcon={false}
                onClose={() => setCustomersDropdownActive(false)}
                getOptionSelected={(option, value) => option.id === value.id}
                disableClearable
                options={customers?.length > 0 ? customers : []}
                getOptionLabel={(customer) => customer.fullName}
                loading={isLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={({ target }) =>
                      setCustomerNameQuery(target.value)
                    }
                    error={invalidCustomerSelect}
                    inputRef={ref}
                    label="Customer"
                    InputProps={{ ...params.InputProps }}
                  />
                )}
              />
              {customer && (
                <Box pt={1}>
                  <p>{customer.address1}</p>
                  <p>{customer.address2}</p>
                  <p>
                    {`${customer.city} ${customer.state} ${customer.zipCode}`}
                  </p>
                </Box>
              )}
            </Box>

            <PricedLineItems fieldArrayName={'invoiceLineItemsAttributes'} />
            <Box mt={4}>
              <SubmitButton status={formStatus} dirty={isDirty}>
                Create Invoice
              </SubmitButton>
            </Box>
          </form>
        </Box>
      </FormProvider>
    </DataFetchWrapper>
  );
}
