

import { fetchData } from "../../helpers/axiosHelper/axiosHelper";
import type { Car, User } from "../../types/auth.types";
import type { UserByTokenResponse } from "../../types/login.types";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
   const [car, setCar] = useState<Car[] | null>(null);

  
  
  useEffect(() => {

  const tokenLS = localStorage.getItem("token");

  const fetchUser = async () => {

    if (!tokenLS) {
      setUser(null);
      setToken(null);
      setCar(null);
      return;
    }

    try {

      const resUser = await fetchData<never, UserByTokenResponse>({
        url: "user/userByToken",
        method: "GET",
        token: tokenLS,
      });

      setToken(tokenLS);
      setUser(resUser.user);
      setCar(resUser.car);

    } catch (error) {
      console.log(error);
      setUser(null);
      setToken(null);
      setCar(null);
      localStorage.removeItem("token");
    }
  };

  fetchUser();

}, []);


    const logout = () => {
    setUser(null);
    setToken(null);
    setCar(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser,
      token,
      setToken,
      car,
      setCar,
      logout 
      }}>
      {children}
    </AuthContext.Provider>
  );
};

