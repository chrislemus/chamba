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
import { useHistory } from 'react-router-dom';

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

function Login({ user, authUser, logIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (!!user) {
      console.log('LOGGED IN');
    } else {
      console.log('NO USER');
    }
    // if (!!user) history.push('/overview');
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn({ email, password });
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
  return { logIn: (user) => dispatch(login(user)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
