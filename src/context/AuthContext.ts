import { createContext } from "react";

type AuthContextType = {
    token: string,
    setToken: (active: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;