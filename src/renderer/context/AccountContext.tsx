import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

import { Account } from '@/lib/types'

interface AccountContextType {
    account: Account | null;
    login: (account: Account) => void;
    logout: () => void;
  }


  const AccountContext = createContext<AccountContextType | undefined>(undefined);

  export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<Account | null>(null);
  
    // Load account from localStorage on mount
    useEffect(() => {
      const storedAccount = localStorage.getItem("account");
      if (storedAccount) {
        setAccount(JSON.parse(storedAccount));
      }
    }, []);
  
    // Save account to localStorage whenever it changes
    useEffect(() => {
      if (account) {
        localStorage.setItem("account", JSON.stringify(account));
      } else {
        localStorage.removeItem("account");
      }
    }, [account]);
  
    const login = (newAccount: Account) => {
      setAccount(newAccount);
    };
  
    const logout = () => {
      console.log('logging out');
      setAccount(null);
    };
  
    const contextValue = useMemo(() => ({ account, login, logout }), [account, login, logout]);

    return (
      <AccountContext.Provider value={contextValue}>
        {children}
      </AccountContext.Provider>
    );
  };
  
  // Custom hook to use the AccountContext
  export const useAccount = () => {
    const context = useContext(AccountContext);
    if (!context) {
      throw new Error("useAccount must be used within an AccountProvider");
    }
    return context;
  };

  export const useIsLoggedIn = () => {
    const { account } = useAccount();
    return !!account; // Returns true if an account exists, false otherwise
  };