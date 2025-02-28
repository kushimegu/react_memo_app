import { React, createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginStatus = () => useContext(LoginContext);

LoginProvider.propTypes = {
  children: PropTypes.node,
};
