import { useState } from "react";
import { useNavigate } from "react-router";
import type { LoginErrors, LoginForm, LoginResponse, UserByTokenResponse } from "../../../../types/login.types";
import { loginSchema } from "../../../../schemas/LoginScherma";
import { fetchData } from "../../../../helpers/axiosHelper/axiosHelper";
import { ZodError } from "zod";
import axios from "axios";
import "./LoginPage.css"
import { useAuth } from "../../../../context/AuthContext/useAuth";


type InputName = keyof LoginForm;

type FormInput = HTMLInputElement & {
  name: InputName;
};

const initialValue: LoginForm = {
  email: "",
  password: "",
};


const LoginPage = () => {

  const [login, setLogin] = useState<LoginForm>(initialValue);
  const [errorMsg, setErrorMsg] = useState("");
  const [valErrors, setValErrors] = useState<LoginErrors>({});

  const { setUser, setToken } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<FormInput>) => {
    const { name, value } = e.target;

    setLogin(prev => ({
      ...prev,
      [name]: value
    }));

    setValErrors(prev => ({
      ...prev,
      [name]: ""
    }));

    setErrorMsg("");
  };


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      loginSchema.parse(login);

      const res = await fetchData<LoginResponse>({
        url: 'user/login',
        method: 'POST',
        data: login,
      });
      const token = res.token;

      const resUser = await fetchData<UserByTokenResponse>({
        url: "user/userByToken",
        method: "GET",
        token,
      });;


      localStorage.setItem("token", token);
      setUser({
        ...resUser.user,
        user_id: Number(resUser.user.user_id)
      });
      setToken(token);




      /*  const type = Number(resUser.data.user?.type);
 
       if (type === 1) navigate("/admin");
       else if (type === 2) navigate("/worker/profile");
       else navigate("/profile"); */

    } catch (error) {
      if (error instanceof ZodError) {
        const fieldsErrors: LoginErrors = {};
        error.issues.forEach((elem) => {
          const field = elem.path[0] as keyof LoginForm;
          fieldsErrors[field] = elem.message;
        });
        setValErrors(fieldsErrors);
        setErrorMsg("");
      } else if (axios.isAxiosError<{ message: string }>(error)) {
        setErrorMsg(error.response?.data?.message || "Login error");
      } else {
        setErrorMsg("Unexpected error");
        setValErrors({});
      }
    }
  }


  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Entra en tu perfil</h2>

        <form onSubmit={onSubmit} className="login-form" noValidate>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              value={login.email}
              placeholder="Introduce tu e-mail"
              onChange={handleChange}
              type="email"
              autoComplete="email"
            />
            {valErrors.email && <p className="error">{valErrors.email}</p>}
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              placeholder="Introduce tu contraseña"
              onChange={handleChange}
              value={login.password}
              name="password"
              type="password"
              autoComplete="current-password"
            />

            {errorMsg && <p className="text-danger">{errorMsg}</p>}
            {valErrors.password && (
              <p className="error">{valErrors.password}</p>
            )}
          </div>

          <div className="buttons">
            <button type="submit" className="button_register acept">
              ACEPTAR
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="button_register cancel"
            >
              CANCELAR
            </button>
          </div>

          <p className="not-registered">
            ¿No estás registrado?{" "}
            <span onClick={() => navigate("/register")} className="register-link">
              Regístrate
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage