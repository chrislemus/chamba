import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import SubmitButton from '../../../ui/SubmitButton';
import { addNewCustomer } from '../../../services/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { us_states } from '../../../helpers/sharableConst';
import { Formik, Form } from 'formik';
import ValidationErrors from '../../../ui/ValidationErrors';
import { useMutation } from 'react-query';
import { alertModalDanger } from '../../../actions/alertModalActions';
import { TextField, SelectField } from '../../../components/formik-ui';

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
const InitialFormValues = Object.assign(
  ...formFieldNames.map((key) => ({ [key]: '' }))
);

export default function NewCustomer() {
  const router = useRouter();
  const formikRef = useRef();
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState([]);

  const { mutate: handleSubmit, status: formStatus } = useMutation(
    addNewCustomer,
    {
      onError: (error) => {
        setValidationErrors(error.validationErrors);
        dispatch(alertModalDanger('unable to create customer'));
      },
      onSuccess: (data) => {
        setValidationErrors([]);
        const customerId = data?.customer?.id;
        router.push(`/dashboard/customers/${customerId}`);
      },
    }
  );

  return (
    <>
      <div className="app-header">
        <div className="app-header-left">
          <h1>New Customer</h1>
        </div>
        <div className="app-header-right">
          <Link
            href="/dashboard/customers"
            className="button is-primary is-outlined is-rounded"
          >
            Cancel
          </Link>
        </div>
      </div>
      <Formik
        innerRef={formikRef}
        initialValues={InitialFormValues}
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
              Save Client
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
}
