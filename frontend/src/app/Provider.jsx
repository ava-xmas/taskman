import { useState, createContext, useContext, useEffect } from "react";

// auth provider
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // we're basically combining the powers of useState and createContext 
    //  to create a global stateful variable that can be used by all components in the tree
    const [auth, setAuth] = useState(() => {
        const storedToken = localStorage.getItem('auth');
        return storedToken ? { token: storedToken } : { token: null };
    });

    useEffect(() => {
        if (auth.token) {
            localStorage.setItem('auth', auth.token);
        } else {
            localStorage.removeItem('auth');
        }
    }, [auth]);

    return (
        // we're passing both the current auth value and the fn to update it into the auth provider
        // hence any component that uses useAuth() can 1. read the auth state 2. update it with setAuth

        // .Provider is a core feature of the React Context, and it means --
        // I want to make the value {auth, setAuth} available to all components inside this Provider
        // so they can access it using useContext(AuthContext)
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

// custom hook for the above context
export const useAuth = () => {
    return useContext(AuthContext);
}