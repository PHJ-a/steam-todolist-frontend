import React, { createContext, useContext, useEffect, useState } from 'react';

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProviderType = {
  children: React.ReactNode;
};
export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = document.cookie.includes('true');

      setIsLoggedIn(isLoggedIn);
    };

    checkLoginStatus();
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('컨텍스트 에러');
  }
  return context;
};
