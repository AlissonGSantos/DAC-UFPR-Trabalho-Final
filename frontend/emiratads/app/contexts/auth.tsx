"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { EmployeeEnum, UserAuth } from "../types/AuthTypes";
import loginServices from "../authentication/services/loginServices";

export const getFromCookies = (key: string): string | null => {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`));
  return cookies ? cookies.split("=")[1] : null;
};

export const saveToCookies = async (key: string, value: string) => {
  document.cookie = `${key}=${value}; path=/; max-age=3600; secure; samesite=strict`;
};

type AuthContextType = {
  userData: UserAuth | undefined | null;
  setUserData: (data: UserAuth) => void;
  logout: () => void;
  login: (data: UserAuth) => void;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  updateMilesBalance: (miles: number) => void;
  getUserType: () => EmployeeEnum | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserAuth | undefined | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const updateMilesBalance = useCallback(
    (miles: number) => {
      if (userData) {
        const updatedUserData: UserAuth = {
          ...userData,
          usuario: { ...userData.usuario, saldo_milhas: miles },
        };
        setUserData(updatedUserData);
        saveToCookies("user", JSON.stringify(updatedUserData));
      }
    },
    [userData]
  );

  const login = (data: UserAuth) => {
    setIsLogged(true);
    setUserData(data);
    saveToCookies("token", data.access_token);
    saveToCookies("user", JSON.stringify(data));
  };

  const logout = useCallback(async () => {
    setIsLogged(false);
    setUserData(null);
    if (userData) {
      await loginServices.logout({
        login: userData.usuario.email,
      });
    }
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "user=; path=/; max-age=0";
    window.location.href = "/authentication/login";
  }, [userData]);

  const getUserType = useCallback((): EmployeeEnum | null => {
    if (userData) {
      return userData.tipo;
    }
    return null;
  }, [userData]);

  useEffect(() => {
    const token = getFromCookies("token");
    const user = getFromCookies("user");

    if (token && user) {
      setIsLogged(true);
      setUserData(JSON.parse(user));
    } else {
      setIsLogged(false);
      setUserData(null);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      saveToCookies("user", JSON.stringify(userData));
    }
  }, [userData]);

  const contextValue = useMemo(
    () => ({
      userData,
      setUserData,
      login,
      logout,
      isLogged,
      setIsLogged,
      updateMilesBalance,
      getUserType,
    }),
    [userData, logout, isLogged, updateMilesBalance, getUserType]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
