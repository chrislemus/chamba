import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { us_states } from '../../../../helpers/sharableConst';
import SubmitButton from '../../../../ui/SubmitButton';
import { Formik, Form } from 'formik';
import { TextField, SelectField } from '../../../../components/formik-ui';
import {
  alertModalSuccess,
  alertModalDanger,
} from '../../../../actions/alertModalActions';
import ValidationErrors from '../../../../ui/ValidationErrors';
import {
  editCustomer,
  fetchCustomerById,
  deleteCustomer,
} from '../../../../services/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import DataFetchWrapper from '../../../../components/DataFetchWrapper';
import { updateObjValues } from '../../../../helpers/dataManipulation/objects';
const formSelectStateOptions = us_states.map(([stateName, stateAbbr]) => ({
  name: stateName,
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

const initialFormValues = Object.assign(
  ...formFieldNames.map((key) => ({ [key]: '' }))
);

export default function EditCustomer() {
  const router = useRouter();
  const formikRef = useRef();
  const dispatch = useDispatch();
  const [formSyncedOnMount, setFormSyncedOnMount] = useState(false);

  const customerId = router.query.id;

  const queryClient = useQueryClient();
  const { status, data } = useQuery(['customerDetails', { customerId }], () =>
    fetchCustomerById(customerId)
  );
  const [validationErrors, setValidationErrors] = useState([]);
  const customer = data?.customer;

  useEffect(() => {
    const resetForm = formikRef.current?.resetForm;
    if (customer && resetForm && !formSyncedOnMount) {
      const updatedIntialData = updateObjValues(initialFormValues, customer);
      resetForm({ values: updatedIntialData });
      setFormSyncedOnMount(true);
    }
  }, [customer]);

  const { mutate: handleDelete } = useMutation(
    () => deleteCustomer(customerId),
    {
      onError: () => {
        dispatch(alertModalDanger('unable to delete customer'));
      },
      onSuccess: () => {
        dispatch(alertModalSuccess('customer deleted'));
        router.push('/dashboard/customers');
      },
    }
  );

  const { mutate: handleSubmit, status: formStatus } = useMutation(
    (newCustomerDetails) => editCustomer(customerId, newCustomerDetails),
    {
      onMutate: async (newCustomerDetails) => {
        await queryClient.cancelQueries(['customerDetails', { customerId }]);
        const previousData = queryClient.getQueryData([
          'customerDetails',
          { customerId },
        ]);
        queryClient.setQueryData(
          ['customerDetails', { customerId }],
          (oldData) => ({
            ...oldData,
            customer: newCustomerDetails,
          })
        );

        return previousData;
      },
      onError: (error, newCustomerDetails, previousData) => {
        setValidationErrors(error.validationErrors);
        dispatch(alertModalDanger('unable to save changes'));
        return queryClient.setQueryData(
          ['customerDetails', { customerId }],
          previousData
        );
      },
      onSuccess: () => {
        dispatch(alertModalSuccess('customer updated'));
        setValidationErrors([]);
      },
      onSettled: () =>
        queryClient.invalidateQueries(['customerDetails', { customerId }]),
    }
  );

  return (
    <>
      <div className="app-header">
        <div className="app-header-left">
          <h1>Customer Edit</h1>
        </div>
        <div className="app-header-right">
          <button
            onClick={() => router.back()}
            className="button is-primary is-outlined is-rounded"
          >
            Cancel
          </button>
        </div>
      </div>

      <DataFetchWrapper
        status={status}
        dataName="Customer"
        hasData={customer}
        className="mt-6"
      >
        <Formik
          innerRef={formikRef}
          initialValues={initialFormValues}
          onSubmit={handleSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.firstName) {
              errors.firstName = 'Required';
            }
            return errors;
          }}
        >
          {(props) => (
            <Form className="box py-5">
              <ValidationErrors errors={validationErrors} />
              <div className="field-body mb-3">
                <TextField name="firstName" type="text" label="First Name" />
                <TextField name="lastName" type="text" label="Last Name" />
              </div>
              <TextField name="companyName" type="text" label="Company Name" />
              <TextField name="email" type="text" label="Email" />
              <div className="field-body mb-3">
                <TextField name="phoneMobile" type="tel" label="Phone Mobile" />
                <TextField name="phoneHome" type="tel" label="Phone Home" />
              </div>
              <TextField name="address1" type="text" label="Address 1" />
              <TextField name="address2" type="text" label="Address 2" />
              <div className="columns mb-3">
                <div className="column is-narrow">
                  <TextField name="city" type="text" label="City" />
                </div>
                <div className="column is-narrow">
                  <SelectField
                    name="state"
                    label="State/Region"
                    options={formSelectStateOptions}
                  />
                </div>
                <div className="column is-narrow">
                  <TextField name="zipCode" type="text" label="Zip Code" />
                </div>
                <div className="column is-narrow">
                  <TextField
                    name="country"
                    value="USA"
                    disabled
                    type="text"
                    label="Country"
                  />
                </div>
              </div>
              <SubmitButton
                status={formStatus}
                isValid={props.isValid}
                dirty={props.dirty}
              >
                Save Changes
              </SubmitButton>
              <br />
              <button
                onClick={handleDelete}
                className="mt-5 button is-danger is-outlined is-rounded"
                type="button"
              >
                Delete Customer
              </button>
            </Form>
          )}
        </Formik>
      </DataFetchWrapper>
    </>
  );
}