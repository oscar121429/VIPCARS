import { createContext } from "react";
import type { Car, User } from "../../types/auth.types";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  car: Car[] | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setCar: React.Dispatch<React.SetStateAction<Car[] | null>>;
  logout: () => void;
}




export const AuthContext = createContext<AuthContextType | null>(null);