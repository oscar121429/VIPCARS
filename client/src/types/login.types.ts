import type { Car, User } from "./auth.types";

export type LoginForm = {
  email: string;
  password: string;
};

export interface LoginResponse {
  message: string;
  token: string;
};

export interface UserByTokenResponse {
  message: string;
  user: User;
  car: Car[];
}

export type LoginErrors = Partial<Record<keyof LoginForm, string>>;