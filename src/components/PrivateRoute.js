import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ authenticatedUser, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !!authenticatedUser ? (
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

export default connect((state) => ({ ...state.account }))(PrivateRoute);
