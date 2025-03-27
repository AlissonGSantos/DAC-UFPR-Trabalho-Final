"use client"
import React, {createContext, useContext} from "react"
import { LoginRequest, RegisterRequest, UserAuth } from "../types/AuthTypes"

type AuthContextType = {
    userData: UserAuth | undefined | null,
    setUserData: (data: UserAuth) => void,
    logout: () => void
    login: (data: LoginRequest)=>UserAuth
    register: (data: RegisterRequest)=>RegisterRequest
    isLogged: boolean,
    setIsLogged: (isLogged:boolean)=>void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userData, setUserData] = React.useState<UserAuth | undefined | null>(undefined);
    const [isLogged, setIsLogged] = React.useState<boolean>(false);
    const login = (data: LoginRequest) => {
        console.log("Login", data);
        setIsLogged(true);
        return {} as UserAuth;
    }

    const logout = () => {
        console.log("Logout");
        setIsLogged(false);
    }
    const register = (data: RegisterRequest) => {
        console.log("Register", data);
        return data;
    }
    
    const contextValue = React.useMemo(() => ({
        userData,
        setUserData,
        login,
        register,
        logout,
        isLogged,
        setIsLogged
    }), [userData, login, register, logout, isLogged]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};