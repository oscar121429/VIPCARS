type AuthContextType = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};


import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);