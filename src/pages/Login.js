import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { TextField } from '../components/formik-ui';
import ValidationErrors from '../iu/ValidationErrors';
import { useMutation } from 'react-query';
import { authUser } from '../services/api';
import SubmitButton from '../iu/SubmitButton';
import { useHistory } from 'react-router-dom';
import { addUser } from '../actions/userActions';
export default function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const authUserToken = Cookies.get('authToken');
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (authUserToken) history.push('/overview');
  }, [authUserToken]);

  // if (authUserToken) history.push('/overview');

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
    <div className="columns mt-6 mx-1">
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
            <TextField
              type="password"
              name="password"
              label="Password"
              placeholder="e.g. alexsmith@gmail.com"
            />

            <SubmitButton status={status} dirty={dirty}>
              Log In
            </SubmitButton>
            <a className="mt-3 is-block" href="/signup">
              Don't have an account? Sign Up
            </a>
          </Form>
        )}
      </Formik>
    </div>
  );
}
