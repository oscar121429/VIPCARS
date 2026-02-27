

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
  const [car, setCar] = useState<Car[]>([]);



  useEffect(() => {

    const tokenLS = localStorage.getItem("token");
    if (tokenLS) {
      const fetchUser = async () => {


        try {

          const resUser = await fetchData<UserByTokenResponse>({
            url: "user/userByToken",
            method: "GET",
            token: tokenLS,
          });

          setToken(tokenLS);
          setUser(resUser.user);
          setCar(
            resUser.car.map((c) => ({
              ...c,
              price: Number(c.price)
            }))
          );

        } catch (error) {
          console.log(error);

        }
      };

      fetchUser();
    }

  }, []);

  useEffect(() => {

  const fetchCars = async () => {

    if (!user || !token) return;

    try {

      const resCars = await fetchData<{car: Car[]}>({
        url: `car/getCarsByUser/${user.user_id}`,
        method: "GET",
        token
      });

      setCar(
        resCars.car.map((c) => ({
          ...c,
          price: Number(c.price)
        }))
      );

    } catch (error) {
      console.log(error);
    }
  };

  fetchCars();

}, [user]);


  const logout = () => {
    setUser(null);
    setToken(null);
    setCar([]);
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

