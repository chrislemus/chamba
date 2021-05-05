import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../store';
import { us_states } from '../../helpers/sharableConst';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SubmitButton from '../../iu/SubmitButton';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { editCustomer, fetchCustomerById } from '../../actions/customerActions';
import ValidationErrors from '../../iu/ValidationErrors';

export default function EditCustomer() {
  const formikRef = useRef();
  const customer = useSelector((state) => state.customer);
  const { status, validationErrors } = customer;
  const customerData = customer.data;
  const dispatch = useDispatch();
  const customerId = useParams().id;

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

  useEffect(() => {
    status === 'idle' && dispatch(fetchCustomerById(customerId));
  }, [status]);

  useEffect(() => {
    if (status === 'success' && customerData) {
      const setFieldValue = formikRef.current?.setFieldValue;
      if (setFieldValue) {
        formFieldNames.forEach((fieldName) => {
          const fieldValue = customerData[fieldName] || '';
          setFieldValue(fieldName, fieldValue);
        });
      }
    }
  }, [status]);

  const handleSubmit = (values, actions) => {
    const customer = values;
    dispatch(editCustomer(customerId, customer));
  };

  const isLoading =
    (status === 'fetching' && !customerData) ||
    (status === 'idle' && !customerData);

  return (
    <>
      <div className="app-header">
        <div className="app-header-left">
          <h1>Customer Edit</h1>
        </div>
        <div className="app-header-right">
          <Link
            onClick={() => history.goBack()}
            className="button is-primary is-outlined is-rounded"
          >
            Cancel
          </Link>
        </div>
      </div>
      {isLoading ? (
        <div className="columns is-centered my-3 ">
          <span className="icon  is-size-3 has-text-primary ">
            <i className="fas fa-spinner fa-pulse" />
          </span>
        </div>
      ) : (
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
              <ValidationErrors errors={validationErrors} />
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

                <SubmitButton status={status}>Save Changes</SubmitButton>
              </>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}
