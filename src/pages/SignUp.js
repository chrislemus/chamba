import { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions/userActions';
import { authUserToken } from '../actions/userActions';

function SignUpPage({ authUser, signUp, history }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const businessName = useRef(null);
  const email = useRef(null);
  const emailConfirmation = useRef(null);
  const password = useRef(null);
  const passwordConfirmation = useRef(null);

  function authUserRedirect() {
    history.push('/overview');
  }

  if (!!authUserToken()) authUserRedirect();

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
    signUp(user, authUserRedirect);
  };

  return (
    <div className="columns mt-6 mx-1">
      <form className="column box is-6 is-offset-3 p-5" onSubmit={handleSubmit}>
        <h1 className="title">Sign Up</h1>
        <div className="content">
          <ul className="has-text-danger mb-5">
            {authUser.errors.map((error, idx) => (
              <li key={`auth-error-${idx}`}>{error}</li>
            ))}
          </ul>
        </div>
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
        <button
          className={`button is-primary my-5 ${
            authUser.fetching && 'is-loading'
          }`}
          disabled={authUser.fetching}
          type="submit"
        >
          Sign Up
        </button>
        <a className="mt-3 is-block" href="/login">
          already have an account? Log In
        </a>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    authUser: state.authUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user, authUserRedirect) =>
      dispatch(signUp(user, authUserRedirect)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
