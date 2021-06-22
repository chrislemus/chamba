import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { Box, Typography } from '@material-ui/core';
import { TextField } from '../components/react-hook-form-ui';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, FormProvider } from 'react-hook-form';
import ValidationErrors from '../ui/ValidationErrors';
import { useMutation } from 'react-query';
import { authUser } from '../services/api';
import SubmitButton from '../ui/SubmitButton';
import { useRouter } from 'next/router';
import { addUser } from '../actions/userActions';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    display: 'flex',
    margin: '0 auto',
    height: 'min-content',
    width: '95%',
    maxWidth: '1200px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    background: '#fff',
    borderRadius: '.2rem',
  },
  form: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2em',
    '& > *': {
      margin: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  pageContainer: {
    paddingTop: '3em',
    paddingBottom: '10rem',
    minHeight: '100vh',
    backgroundColor: '#f0f1ff',
  },

  formGraphic: {
    display: 'block',
    background: '#7a7fff',
    padding: '1em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    textAlign: 'center',
    color: 'white',
    '& img': {
      width: '80%',
      margin: '2em auto 0',
    },
    '& h2': {
      fontSize: '2em',
      fontWeight: 500,
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const reactHookFormMethods = useForm();
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const { handleSubmit } = reactHookFormMethods;
  const dispatch = useDispatch();
  const router = useRouter();
  const authUserToken = Cookies.get('authToken');
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (authUserToken) router.push('/dashboard');
  }, [authUserToken]);

  const { mutate: handleLogin, status } = useMutation(authUser, {
    onError: (error) => setValidationErrors(error.validationErrors),
    onSuccess: ({ user, token }) => {
      const cookieOptions = { expires: 7, secure: true };
      Cookies.set('authToken', JSON.stringify(token), cookieOptions);
      dispatch(addUser(user));
    },
  });
  return (
    <Box className={classes.pageContainer}>
      <Box boxShadow={2} className={classes.formWrapper}>
        <Box className={classes.formGraphic}>
          <h2>CHAMBA</h2>
          <p>Run your business with ease.</p>
          <img src="/business_decisions.svg" alt="business decisions" />
        </Box>
        <FormProvider {...reactHookFormMethods}>
          <form onSubmit={handleSubmit(handleLogin)} className={classes.form}>
            <Typography variant="h3" component="h1">
              <strong>Log In</strong>
            </Typography>
            <ValidationErrors errors={validationErrors} />
            <Typography variant="body2" >
              Demo:  <strong>Email</strong> me@me.com | <strong>Password</strong> Aaaaaaaa123
            </Typography>
            <TextField fullWidth type="email" name="email" label="Email" />
            <TextField
              fullWidth
              type={passwordIsVisible ? 'text' : 'password'}
              name="password"
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setPasswordIsVisible(!passwordIsVisible)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {passwordIsVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box>
              <SubmitButton status={status}>Log In</SubmitButton>
            </Box>
            <Box mt={5}>
              <a href="/signup">Don't have an account? Sign Up</a>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
}
