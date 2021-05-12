import { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions/userActions';
function SignUpPage({ signUp }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const businessName = useRef(null);
  const email = useRef(null);
  const emailConfirmation = useRef(null);
  const password = useRef(null);
  const passwordConfirmation = useRef(null);

  const updateConfirmInputPattern = (event, reference) => {
    const valueToMatch = event.target.value;
    reference.current.pattern = `^${valueToMatch}$`;
  };

  function refValue(ref) {
    return ref.current.value;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      firstName: refValue(firstName),
      lastName: refValue(lastName),
      businessName: refValue(businessName),
      email: refValue(email),
      emailConfirmation: refValue(emailConfirmation),
      password: refValue(password),
      passwordConfirmation: refValue(passwordConfirmation),
    };

    setFormSubmitted(true);
    signUp(user);
  };

  return (
    <div className="columns mt-6 mx-1">
      <form className="column box is-6 is-offset-3 p-5" onSubmit={handleSubmit}>
        <h1 className="title">Sign Up</h1>

        <div className="field-body mb-3">
          <div className="field">
            <label className="label">First Name</label>
            <input className="input" required={formSubmitted} ref={firstName} />
          </div>
          <div className="field">
            <label className="label">Last Name</label>
            <input
              required={formSubmitted}
              className="input"
              type="text"
              name="lastName"
              ref={lastName}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Business Name</label>
          <input
            required={formSubmitted}
            className="input"
            type="text"
            name="businessName"
            ref={businessName}
          />
        </div>
        <div className="field">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            required={formSubmitted}
            ref={email}
            onChange={(event) =>
              updateConfirmInputPattern(event, emailConfirmation)
            }
            placeholder="e.g. alexsmith@gmail.com"
          />
          <p className="help is-danger invalid-help-text">
            please enter valid email
          </p>
        </div>
        <div className="field">
          <label className="label">Confirm Email</label>
          <input
            className="input"
            required={formSubmitted}
            ref={emailConfirmation}
          />
          <p className="help is-danger invalid-help-text">email mismatch</p>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input
            className="input"
            ref={password}
            required={formSubmitted}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
            type="password"
            onChange={(event) =>
              updateConfirmInputPattern(event, passwordConfirmation)
            }
          />
          <p className="help is-danger invalid-help-text">
            password must contain minimum eight characters, at least one
            uppercase letter, one lowercase letter and one number
          </p>
        </div>
        <div className="field">
          <label className="label">Confirm Password</label>
          <input
            className="input"
            required={formSubmitted}
            ref={passwordConfirmation}
            type="password"
          />
          <p className="help is-danger invalid-help-text">password mismatch</p>
        </div>
        <button className="button is-primary my-5" type="submit">
          Sign Up
        </button>
        <a className="mt-3 is-block" href="/login">
          already have an account? Log In
        </a>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user, authUserRedirect) =>
      dispatch(signUp(user, authUserRedirect)),
  };
};

export default connect(null, mapDispatchToProps)(SignUpPage);

// import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { Formik, Form } from 'formik';
// import { useMutation } from 'react-query';
// import { useDispatch } from 'react-redux';
// import { userSignUp } from '../services/api';
// import Cookies from 'js-cookie';
// import ValidationErrors from '../iu/ValidationErrors';
// import { TextField } from '../components/formik-ui';
// import { addUser } from '../actions/userActions';
// import SubmitButton from '../iu/SubmitButton';
// export default function SignUpPage() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [validationErrors, setValidationErrors] = useState([]);
//   const authUserToken = Cookies.get('authToken');

//   if (!!authUserToken) history.push('/overview');

//   const { mutate: handleSubmit, status } = useMutation(
//     (user) => userSignUp(user),
//     {
//       onError: (error) => setValidationErrors(error.validationErrors),
//       onSuccess: ({ user, token }) => {
//         const cookieOptions = { expires: 7, secure: true };
//         Cookies.set('authToken', JSON.stringify(token), cookieOptions);
//         dispatch(addUser(user));
//       },
//     }
//   );

//   return (
//     <div className="columns mt-6 mx-1">
//       <Formik
//         initialValues={{
//           firstName: '',
//           lastName: '',
//           businessName: '',
//           email: '',
//           emailConfirmation: '',
//           password: '',
//           passwordConfirmation: '',
//         }}
//         onSubmit={handleSubmit}
//         validate={(values) => fieldValidations(values)}
//       >
//         {({ dirty }) => (
//           <Form className="column box is-6 is-offset-3 p-5">
//             <h1 className="title">Sign Up</h1>

//             <ValidationErrors errors={validationErrors} />
//             <div className="field-body mb-3">
//               <TextField label="First Name" type="text" name="firstName" />
//               <TextField label="Last Name" type="text" name="lastName" />
//             </div>
//             <TextField label="Business Name" type="text" name="businessName" />
//             <TextField
//               label="Email"
//               type="email"
//               name="email"
//               placeholder="e.g. alexsmith@gmail.com"
//             />
//             <TextField
//               label="Confirm Email"
//               type="email"
//               name="emailConfirmation"
//             />
//             <TextField label="Password" type="password" name="password" />
//             <TextField
//               label="Confirm Password"
//               type="password"
//               name="passwordConfirmation"
//             />

//             <SubmitButton status={status}>Sign Up</SubmitButton>
//             <a className="mt-3 is-block" href="/login">
//               already have an account? Log In
//             </a>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// function fieldValidations(values) {
//   const errors = {};
//   if (!values.firstName) errors.firstName = 'Required';
//   if (!values.lastName) errors.lastName = 'Required';
//   if (!values.businessName) errors.businessName = 'Required';

//   if (!values.email) {
//     errors.email = 'required';
//   } else if (
//     !values.email.match(
//       /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i
//     )
//   ) {
//     errors.email = 'invalid email';
//   }

//   if (!values.password) {
//     errors.password = 'password required';
//   } else if (
//     !values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
//   ) {
//     errors.password =
//       'password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number';
//   }
//   if (!values.emailConfirmation) {
//     errors.emailConfirmation = 'Required';
//   } else if (values.emailConfirmation !== values.email) {
//     errors.emailConfirmation = 'email does not match';
//   }
//   if (!values.passwordConfirmation) {
//     errors.passwordConfirmation = 'Required';
//   } else if (values.passwordConfirmation !== values.password) {
//     errors.passwordConfirmation = 'password does not match';
//   }

//   return errors;
// }
