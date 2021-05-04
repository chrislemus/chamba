import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getUserData } from '../actions/userActions';
import { Route, Redirect } from 'react-router';
import Cookies from 'js-cookie';

function PrivateRoute({ getUserData, user, component: Component, ...rest }) {
  const authUserToken = Cookies.get('authToken');
  const noUserData = Object.keys(user).length === 0;
  if (noUserData) {
    getUserData();
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        authUserToken ? (
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
