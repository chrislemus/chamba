import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getUserData } from '../actions/userActions';
import { Route, Redirect } from 'react-router';
import { authUserToken } from '../actions/userActions';

function PrivateRoute({ getUserData, user, component: Component, ...rest }) {
  const noUserData = Object.keys(user).length === 0;
  if (noUserData) {
    getUserData();
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        authUserToken() ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = ({ user }) => {
  return { user };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: () => dispatch(getUserData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
