import { useRef } from 'react';
import { useSelector } from 'react-redux';
import SubmitButton from '../../iu/SubmitButton';
import { useDispatch } from 'react-redux';
import { addNewCustomer } from '../../actions/customerActions';
import { Link } from 'react-router-dom';
import { us_states } from '../../helpers/sharableConst';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ValidationErrors from '../../iu/ValidationErrors';
export default function NewCustomer() {
  const customer = useSelector((state) => state.customer);
  const formikRef = useRef();
  const dispatch = useDispatch();

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

  const handleSubmit = (values, actions) => {
    const customer = values;
    dispatch(addNewCustomer(customer));
  };

  return (
    <>
      <div className="app-header">
        <div className="app-header-left">
          <h1>New Customer</h1>
        </div>
        <div className="app-header-right">
          <Link
            to="/customers"
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
        {({ isSubmitting, values }) => (
          <Form className="box p-5">
            <ValidationErrors errors={customer.validationErrors} />
            <>
              <div className="field-body mb-3">
                <div className="field">
                  <label className="label">First Name</label>
                  <Field className="input" type="text" name="firstName" />
                  <ErrorMessage
                    className="help is-danger"
                    name="firstName"
                    component="p"
                  />
                </div>
                <div className="field">
                  <label className="label">Last Name</label>
                  <Field className="input" type="text" name="lastName" />
                </div>
              </div>
              <div className="field">
                <label className="label">Company Name</label>
                <Field className="input" type="text" name="companyName" />
              </div>

              <div className="field">
                <label className="label">Email</label>
                <Field className="input" type="text" name="email" />
              </div>

              <div className="field-body mb-3">
                <div className="field">
                  <label className="label">Phone Mobile</label>
                  <Field className="input" type="tel" name="phoneMobile" />
                </div>
                <div className="field">
                  <label className="label">Phone Home</label>
                  <Field className="input" type="tel" name="phoneHome" />
                </div>
              </div>

              <div className="field">
                <label className="label">Address 1</label>
                <Field className="input" type="text" name="address1" />
              </div>
              <div className="field">
                <label className="label">Address 2</label>
                <Field className="input" type="text" name="address2" />
              </div>

              <div className="columns mb-3">
                <div className="field column is-narrow">
                  <label className="label">City</label>
                  <Field className="input" type="text" name="city" />
                </div>
                <div className="field column is-narrow">
                  <label className="label">State/Region</label>
                  <div className="select">
                    <Field as="select" className="input" name="state">
                      <option value="">Select state</option>
                      {us_states.map(([state, abbr]) => (
                        <option key={`us-state-${abbr}`} value={abbr}>
                          {state}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>

                <div className="field column is-narrow">
                  <label className="label">Zip Code</label>
                  <Field className="input" type="text" name="zipCode" />
                </div>
                <div className="field column is-narrow">
                  <label className="label">Country</label>
                  <Field
                    className="input"
                    type="text"
                    name="cpuntry"
                    value="USA"
                    disabled
                  />
                </div>
              </div>

              <SubmitButton status={customer.status}>Save Changes</SubmitButton>
            </>
          </Form>
        )}
      </Formik>
    </>
  );
}
