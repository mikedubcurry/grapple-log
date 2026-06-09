import { createContext, useContext, useState, type ReactNode } from "react";

const SESSION_KEY = 'gl_authed'
const HARDCODED_USER_ID = 'user-123'

interface AuthContextValue {
    isAuthenticated: boolean;
    userId: string;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem(SESSION_KEY))

    const login = (username: string, password: string) => {
        if (username === 'mike' && password === 'bjj123') {
            sessionStorage.setItem(SESSION_KEY, 'true')
            setIsAuthenticated(true)
            return true
        }
        return false
    }

    const logout = () => {
        sessionStorage.removeItem(SESSION_KEY)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userId: HARDCODED_USER_ID }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be called within AuthProvider")

    return ctx
}
