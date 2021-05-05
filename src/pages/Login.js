import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/userActions';
import Cookies from 'js-cookie';
import ValidationErrors from '../iu/ValidationErrors';
function Login(props) {
  const { authUser, logIn, history } = props;
  console.log(props);
  const authUserToken = Cookies.get('authToken');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function authUserRedirect() {
    history.push('/overview');
  }

  if (!!authUserToken) authUserRedirect();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    logIn(user, authUserRedirect);
  };

  return (
    <div className="columns mt-6 mx-1">
      <form className="column box is-6 is-offset-3 p-5" onSubmit={handleSubmit}>
        <h1 className="title">Log In</h1>
        <ValidationErrors errors={authUser.errors} />

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              onChange={({ target }) => setEmail(target.value)}
              placeholder="e.g. alexsmith@gmail.com"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              onChange={({ target }) => setPassword(target.value)}
              type="password"
            />
          </div>
        </div>
        <button
          className={`button is-primary my-5 ${
            authUser.fetching && 'is-loading'
          }`}
          disabled={authUser.fetching}
          type="submit"
        >
          Log In
        </button>
        <a className="mt-3 is-block" href="/signup">
          Don't have an account? Sign Up
        </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
