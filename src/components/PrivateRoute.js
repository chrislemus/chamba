import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function PrivateRoute({ authenticatedUser, children }) {
  const history = useHistory();
  useEffect(() => {
    if (!authenticatedUser) history.push('./login');
  }, [authenticatedUser]);

  return <>{children}</>;
}

export default connect((state) => state)(PrivateRoute);
