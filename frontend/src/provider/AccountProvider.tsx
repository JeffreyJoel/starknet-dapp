/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';

const AccountContext = createContext({ account: null, setAccount: (newAccount: unknown) => {} });

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);