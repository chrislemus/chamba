import React, { useEffect, useState } from 'react';

import {
  Button,
  Container,
  TextField,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { login } from '../actions/userActions';
import { authUserToken } from '../actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  inputField: {
    width: '100%',
  },
}));

function Login({ user, authUser, logIn, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  // console.log(history);
  function authUserRedirect() {
    history.push('/overview');
  }
  if (!!authUserToken()) authUserRedirect();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    logIn(user, authUserRedirect);
  };

  const displayAuthErrors = () => {
    const errorItems = authUser.errors.map((error, idx) => (
      <li key={`auth-error-${idx}`}>{error}</li>
    ));
    return <ul style={{ color: 'red' }}>{errorItems}</ul>;
  };

  return (
    <Container maxWidth="sm">
      <Box
        boxShadow={3}
        bgcolor="background.paper"
        mt={10}
        p={4}
        style={{ width: '100%' }}
      >
        <form className={classes.root} noValidate onSubmit={handleSubmit}>
          <h1>Log In</h1>
          {displayAuthErrors()}
          <TextField
            id="standard-basic"
            label="Email"
            onChange={({ target }) => setEmail(target.value)}
            className={classes.inputField}
          />
          <TextField
            id="standard-basic"
            label="Password"
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            className={classes.inputField}
          />
          <Button
            disabled={authUser.fetching}
            variant="contained"
            type="submit"
            color="primary"
          >
            {authUser.fetching ? <CircularProgress /> : 'Log In'}
          </Button>
        </form>
      </Box>
    </Container>
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
