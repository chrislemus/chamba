import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../actions/userActions';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

function PrivateRoute({ getUserData, user, component: Component, ...rest }) {
  const authToken = Cookies.get('authToken');
  const noUserData = Object.keys(user).length === 0;
  useEffect(() => {
    if (noUserData) {
      console.log('noUserData');
      getUserData();
    }
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        !!authToken ? (
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
