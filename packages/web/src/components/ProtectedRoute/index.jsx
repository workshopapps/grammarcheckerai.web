import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('isUserDetails');
  let location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
