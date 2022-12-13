import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthRoutes({ children }) {
  const user = localStorage.getItem('isUserDetails');

  if (user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/me/home" replace />;
  }

  return children;
}

AuthRoutes.propTypes = {
  children: PropTypes.node,
};

export default AuthRoutes;
