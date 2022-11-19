import React from 'react';
import PropTypes from 'prop-types';

let AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    const signIn = newUser;
    setUser(newUser);
    callback();
    return signIn;
  };

  let signout = (callback) => {
    const signIn = true;
    callback();
    return signIn;
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
