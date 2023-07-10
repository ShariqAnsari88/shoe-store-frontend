import React, { createContext, useContext, useEffect } from "react";
import nookies from "nookies";

const User = createContext({ user: null, loading: false });

let userState;

export const UserProvider = ({ value, children }) => {
  const { user } = value;

  useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, []);

  return <User.Provider value={value}>{children}</User.Provider>;
};

export const getUser = (ctx) => {
  const cookies = nookies.get(ctx);

  let user = null;

  if (cookies.jwt) {
    user = JSON.parse(cookies.user);
    return {...user, jwt: cookies.jwt}
  }

  return {user, jwt: null }
};

export const useAuthContext = () => useContext(User);
