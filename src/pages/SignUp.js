import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions/userActions';
import { authUserToken } from '../actions/userActions';

function SignUpPage({ user, authUser, signUp, history }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  function authUserRedirect() {
    history.push('/overview');
  }

  if (!!authUserToken()) authUserRedirect();
  const validate = (input) => {
    const validates = input.checkValidity();
    if (validates) {
      input.classList.remove('is-danger');
    } else {
      input.classList.add('is-danger');
    }
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // console.log(userData);
    // signUp(user, authUserRedirect);
  };

  return (
    <div className="columns mt-6 mx-1">
      <form
        className="column box is-6 is-offset-3 p-5"
        noValidate
        onSubmit={handleSubmit}
      >
        <h1 className="title">Sign Up</h1>
        <div className="content">
          <ul className="has-text-danger mb-5">
            {authUser.errors.map((error, idx) => (
              <li key={`auth-error-${idx}`}>{error}</li>
            ))}
          </ul>
        </div>
        <div class="field-body mb-3">
          <div class="field">
            <label class="label">First Name</label>
            <div class="control">
              <input
                class="input invalid-style"
                pattern="[a-zA-Z]{2,}"
                name="firstName"
                required
                onChange={({ target }) => validate(target)}
                onInvalid={() => console.log('INVALID_FIRST_NAME')}
                type="text"
              />
            </div>
            <p class="help is-danger">First name needed</p>
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                name="lastName"
                // onChange={({ target }) => setEmail(target.value)}
              />
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              class="input"
              type="email"
              onChange={({ target }) => setEmail(target.value)}
              placeholder="e.g. alexsmith@gmail.com"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input"
              onChange={({ target }) => setPassword(target.value)}
              type="password"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Confirm Password</label>
          <div class="control">
            <input
              class="input"
              // onInvalid={() => console.log('INVALID_FIRST_NAME')}
              // onChange={({ target }) => setPassword(target.value)}
              type="password"
            />
          </div>
        </div>
        <a className="mb-3 is-block" href="/login">
          already have an account? Log In
        </a>
        <button
          className={`button is-primary ${authUser.fetching && 'is-loading'}`}
          disabled={authUser.fetching}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
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
