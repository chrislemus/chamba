import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/userActions';
import { authUserToken } from '../actions/userActions';

function SignUp({ user, authUser, logIn, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function authUserRedirect() {
    history.push('/overview');
  }

  if (!!authUserToken()) authUserRedirect();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    logIn(user, authUserRedirect);
  };

  return (
    <div className="columns mt-6 mx-1">
      <form
        className="column box is-6 is-offset-3 p-5"
        noValidate
        onSubmit={handleSubmit}
      >
        <h1 className="title">Sign Up</h1>
        <ul className="has-text-danger mb-5">
          {authUser.errors.map((error, idx) => (
            <li key={`auth-error-${idx}`}>{error}</li>
          ))}
        </ul>
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
        <button
          className={`button is-primary ${authUser.fetching && 'is-loading'}`}
          disabled={authUser.fetching}
          type="submit"
        >
          Log In
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
    logIn: (user, authUserRedirect) => dispatch(login(user, authUserRedirect)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
