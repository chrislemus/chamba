import { useRouter } from 'next/router';
import { Box, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useForm, FormProvider, useController } from 'react-hook-form';
import { PricedLineItems } from '../../../components/react-hook-form-ui';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useQuery } from 'react-query';
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
  useState(true);
  const [customer, setCustomer] = useState(null);
  const [customerNameQuery, setCustomerNameQuery] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  useEffect(() => {
    if (customer?.id) setFieldValue('customerId', customer.id);
  }, [customer]);

  const {
    field: { ref, ...inputProps },
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
      onError: (error) => {
        setValidationErrors(error.validationErrors);
      },
      onSuccess: (data) => {
        const invoiceId = data?.invoice?.id;
        router.push(`/dashboard/invoices/${invoiceId}`);
      },
    }
  );

  return (
    <DataFetchWrapper dataName="Invoice Details">
      <div className="app-header">
        <div className="app-header-left">
          <h1>New Invoice</h1>
        </div>
        <div className="app-header-right">
          <button
            onClick={() => router.back()}
            className="button is-primary is-rounded"
          >
            Cancel
          </button>
        </div>
      </div>

      <FormProvider {...reactHookFormMethods}>
        <Box bgcolor="white" boxShadow={2} borderRadius={3} py={6} px={3}>
          <form
            className="columns is-multiline mx-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ValidationErrors errors={validationErrors} />

            <div className="column is-3">
              {/* <h6 className="has-text-weight-bold">Billed to</h6> */}
              <Autocomplete
                size="small"
                onChange={(_0, customer) => setCustomer(customer)}
                open={customersDropdownActive}
                onOpen={() => setCustomersDropdownActive(true)}
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
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: <>{params.InputProps.endAdornment}</>,
                    }}
                  />
                )}
              />
              {customer && (
                <Box pt={1}>
                  <p>{customer.address1}</p>
                  <p>{customer.address2}</p>
                  <p>
                    {customer.city} {customer.state} {customer.zipCode}
                  </p>
                </Box>
              )}
            </div>

            <div className="column is-12">
              <PricedLineItems fieldArrayName={'invoiceLineItemsAttributes'} />
              <Box mt={4}>
                <SubmitButton status={formStatus} dirty={isDirty}>
                  Create Invoice
                </SubmitButton>
              </Box>
            </div>
          </form>
        </Box>
      </FormProvider>
    </DataFetchWrapper>
  );
}
