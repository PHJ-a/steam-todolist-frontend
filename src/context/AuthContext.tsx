import React, { createContext, useContext, useEffect, useState } from 'react';

export interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProviderType = {
  children: React.ReactNode;
};
export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const checkLoginStatus = () => {
  //     const isLoggedIn = document.cookie.includes('true');
  //     console.log(isLoggedIn, '컨텍스트');

  //     setIsLoggedIn(isLoggedIn);
  //   };

  //   checkLoginStatus();
  // });
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginCookie = document.cookie
        .split(';')
        .find((row) => row.trim().startsWith('isLoggedIn='));
      const isLoggedIn = loginCookie
        ? loginCookie.split('=')[1] === 'true'
        : false;
      console.log('Login status:', isLoggedIn);
      setIsLoggedIn(isLoggedIn);
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading }}>
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
