import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { TextField } from '../components/formik-ui';
import ValidationErrors from '../ui/ValidationErrors';
import { useMutation } from 'react-query';
import { authUser } from '../services/api';
import SubmitButton from '../ui/SubmitButton';
import { useRouter } from 'next/router';
import { addUser } from '../actions/userActions';
export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const authUserToken = Cookies.get('authToken');
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (authUserToken) router.push('/dashboard');
  }, [authUserToken]);

  const { mutate: handleLogin, status } = useMutation(
    (user) => authUser(user),
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
    <div className="columns ">
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
      >
        {({ dirty }) => (
          <Form className="column box is-6 is-offset-3 p-5">
            <h1 className="title">Log In</h1>
            <ValidationErrors errors={validationErrors} />

            <TextField
              type="email"
              name="email"
              label="Email"
              placeholder="e.g. alexsmith@gmail.com"
            />
            <TextField type="password" name="password" label="Password" />

            <SubmitButton status={status}>Log In</SubmitButton>
            <a className="mt-3 is-block" href="/signup">
              Don't have an account? Sign Up
            </a>
          </Form>
        )}
      </Formik>
    </div>
  );
}
