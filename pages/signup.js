import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { userSignUp } from '../services/api';
import Cookies from 'js-cookie';
import { useForm, FormProvider } from 'react-hook-form';
import ValidationErrors from '../ui/ValidationErrors';
import { TextField } from '../components/react-hook-form-ui';
import { addUser } from '../actions/userActions';
import SubmitButton from '../ui/SubmitButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
const emailRegexPattern =
  /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i;
const passwordRegexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;

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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  fieldSet: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    '& > *': {
      width: '48%',
    },
  },
  row: {
    marginTop: '2em',
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

export default function SignUpPage() {
  const classes = useStyles();
  const reactHookFormMethods = useForm();
  const { handleSubmit, formState } = reactHookFormMethods;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState([]);
  const authUserToken = Cookies.get('authToken');

  if (!!authUserToken) router.push('/dashboard');

  const { mutate: handleSignUp, status } = useMutation(
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

  const fieldsMatch = (field1Value, field2Name) => {
    const field2Value = reactHookFormMethods.getValues(field2Name);
    return field1Value === field2Value;
  };

  return (
    <Box className={classes.pageContainer}>
      <Box boxShadow={2} className={classes.formWrapper}>
        <Box className={classes.formGraphic}>
          <h2>CHAMBA</h2>
          <p>Run your business with ease.</p>
          <img src="/business_decisions.svg" alt="business decisions" />
        </Box>
        <FormProvider {...reactHookFormMethods}>
          <form className={classes.form} onSubmit={handleSubmit(handleSignUp)}>
            <Typography variant="h3" component="h1">
              <strong>Sign Up</strong>
            </Typography>

            <ValidationErrors errors={validationErrors} />
            <Box className={classes.fieldSet}>
              <TextField
                label="First Name"
                name="firstName"
                rules={{ required: true }}
              />
              <TextField
                label="Last Name"
                name="lastName"
                rules={{ required: true }}
              />
            </Box>
            <TextField
              label="Business Name"
              name="businessName"
              fullWidth
              rules={{ required: true }}
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              name="email"
              rules={{
                required: true,
                validate: {
                  validEmail: {
                    validator: (value) => emailRegexPattern.test(value),
                    message: 'invalid email',
                  },
                },
              }}
              placeholder="e.g. alexsmith@gmail.com"
            />
            <TextField
              label="Confirm Email"
              fullWidth
              type="email"
              name="emailConfirmation"
              rules={{
                required: true,
                validate: {
                  confirmEmail: {
                    validator: (value) => fieldsMatch(value, 'email'),
                    message: 'email does not match',
                  },
                },
              }}
            />
            <TextField
              label="Password"
              type={passwordVisible ? 'text' : 'password'}
              fullWidth
              name="password"
              rules={{
                required: true,
                validate: {
                  validPassword: {
                    validator: (value) => passwordRegexPattern.test(value),
                    message:
                      'password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {passwordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              fullWidth
              type={confirmPasswordVisible ? 'text' : 'password'}
              name="passwordConfirmation"
              rules={{
                required: true,
                validate: {
                  confirmPassword: {
                    validator: (value) => !!fieldsMatch(value, 'password'),
                    message: 'password does not match',
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {confirmPasswordVisible ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <SubmitButton status={status}>Sign Up</SubmitButton>
            <a href="/login">already have an account? Log In</a>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
}

// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import Cookies from 'js-cookie';
// import { Box, Typography } from '@material-ui/core';
// import { TextField } from '../components/react-hook-form-ui';
// import { makeStyles } from '@material-ui/core/styles';
// import { useForm, FormProvider } from 'react-hook-form';
// import ValidationErrors from '../ui/ValidationErrors';
// import { useMutation } from 'react-query';
// import { authUser } from '../services/api';
// import SubmitButton from '../ui/SubmitButton';
// import { useRouter } from 'next/router';
// import { addUser } from '../actions/userActions';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import IconButton from '@material-ui/core/IconButton';
// import InputAdornment from '@material-ui/core/InputAdornment';

// export default function Login() {
//   const classes = useStyles();
//   const reactHookFormMethods = useForm();
//   const [passwordIsVisible, setPasswordIsVisible] = useState(false);
//   const { handleSubmit } = reactHookFormMethods;
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const authUserToken = Cookies.get('authToken');
//   const [validationErrors, setValidationErrors] = useState([]);

//   useEffect(() => {
//     if (authUserToken) router.push('/dashboard');
//   }, [authUserToken]);

//   const { mutate: handleLogin, status } = useMutation(authUser, {
//     onError: (error) => setValidationErrors(error.validationErrors),
//     onSuccess: ({ user, token }) => {
//       const cookieOptions = { expires: 7, secure: true };
//       Cookies.set('authToken', JSON.stringify(token), cookieOptions);
//       dispatch(addUser(user));
//     },
//   });
//   return (
//     <Box className={classes.pageContainer}>
//       <Box boxShadow={2} className={classes.formWrapper}>
//         <Box className={classes.formGraphic}>
//           <h2>CHAMBA</h2>
//           <p>Run your business with ease.</p>
//           <img src="/business_decisions.svg" alt="business decisions" />
//         </Box>
//         <FormProvider {...reactHookFormMethods}>
//           <form onSubmit={handleSubmit(handleLogin)} className={classes.form}>
//             <Typography variant="h3" component="h1">
//               <strong>Log In</strong>
//             </Typography>
//             <ValidationErrors errors={validationErrors} />
//             <TextField
//               fullWidth
//               className={classes.row}
//               type="email"
//               name="email"
//               label="Email"
//               variant="outlined"
//             />
//             <TextField
//               fullWidth
//               className={classes.row}
//               type={passwordIsVisible ? 'text' : 'password'}
//               name="password"
//               label="Password"
//               variant="outlined"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={() => setPasswordIsVisible(!passwordIsVisible)}
//                       onMouseDown={(e) => e.preventDefault()}
//                     >
//                       {passwordIsVisible ? <Visibility /> : <VisibilityOff />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Box className={classes.row}>
//               <SubmitButton status={status}>Log In</SubmitButton>
//             </Box>
//             <Box mt={5}>
//               <a href="/signup">Don't have an account? Sign Up</a>
//             </Box>
//           </form>
//         </FormProvider>
//       </Box>
//     </Box>
//   );
// }
