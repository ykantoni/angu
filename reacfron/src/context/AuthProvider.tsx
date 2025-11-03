import { createContext, useContext, useState, type ReactNode } from "react";
import { login as apiLogin } from "../api/auth";

type AuthContextType = {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    signin: (username: string, password: string) => Promise<void>;
    signout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}

let inMemoryToken: string | null = null;

export function getAccessToken() {
    return inMemoryToken;
}
export function setAccessToken(token: string | null) {
    inMemoryToken = token;
}
export function clearAccessToken() {
    inMemoryToken = null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setTokenState] = useState<string | null>(null);

    function setAccess(token: string | null) {
        setAccessToken(token);
        setTokenState(token);
    }

    async function signin(username: string, password: string) {
        const data = await apiLogin(username, password);
        setAccess(data.accessToken);
    }

    async function signout() {
        clearAccessToken();
        setTokenState(null);
        // optionally notify backend to clear refresh cookie
        await fetch("http://localhost:8080/logout", { method: "POST", credentials: "include" });
    }

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken: setAccess, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
};