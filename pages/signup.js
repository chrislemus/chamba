import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { userSignUp } from '../services/api';
import Cookies from 'js-cookie';
import ValidationErrors from '../ui/ValidationErrors';
import { TextField } from '../components/formik-ui';
import { addUser } from '../actions/userActions';
import SubmitButton from '../ui/SubmitButton';
export default function SignUpPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState([]);
  const authUserToken = Cookies.get('authToken');

  if (!!authUserToken) router.push('/overview');

  const { mutate: handleSubmit, status } = useMutation(
    (user) => userSignUp(user),
    {
      onError: (error) => setValidationErrors(error.validationErrors),
      onSuccess: ({ user, token }) => {
        const cookieOptions = { expires: 7, secure: true };
        Cookies.set('authToken', JSON.stringify(token), cookieOptions);
        dispatch(addUser(user));
      },
    }
  );

  return (
    <div className="columns mt-6 mx-1">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          businessName: '',
          email: '',
          emailConfirmation: '',
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={handleSubmit}
        validate={(values) => fieldValidations(values)}
      >
        {({ dirty }) => (
          <Form className="column box is-6 is-offset-3 p-5">
            <h1 className="title">Sign Up</h1>

            <ValidationErrors errors={validationErrors} />
            <div className="field-body mb-3">
              <TextField label="First Name" type="text" name="firstName" />
              <TextField label="Last Name" type="text" name="lastName" />
            </div>
            <TextField label="Business Name" type="text" name="businessName" />
            <TextField
              label="Email"
              type="email"
              name="email"
              placeholder="e.g. alexsmith@gmail.com"
            />
            <TextField
              label="Confirm Email"
              type="email"
              name="emailConfirmation"
            />
            <TextField label="Password" type="password" name="password" />
            <TextField
              label="Confirm Password"
              type="password"
              name="passwordConfirmation"
            />

            <SubmitButton status={status}>Sign Up</SubmitButton>
            <a className="mt-3 is-block" href="/login">
              already have an account? Log In
            </a>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function fieldValidations(values) {
  const errors = {};
  if (!values.firstName) errors.firstName = 'Required';
  if (!values.lastName) errors.lastName = 'Required';
  if (!values.businessName) errors.businessName = 'Required';

  if (!values.email) {
    errors.email = 'required';
  } else if (
    !values.email.match(
      /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i
    )
  ) {
    errors.email = 'invalid email';
  }

  if (!values.password) {
    errors.password = 'password required';
  } else if (
    !values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  ) {
    errors.password =
      'password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number';
  }
  if (!values.emailConfirmation) {
    errors.emailConfirmation = 'Required';
  } else if (values.emailConfirmation !== values.email) {
    errors.emailConfirmation = 'email does not match';
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Required';
  } else if (values.passwordConfirmation !== values.password) {
    errors.passwordConfirmation = 'password does not match';
  }

  return errors;
}
