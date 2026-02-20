import React, { useState } from 'react'
import "./FormRegister.css"
import { useNavigate } from 'react-router';
import { registerSchema } from '../../../../schemas/RegisterSchema';
import { ZodError } from 'zod';
import type { RegisterErrors, RegisterForm } from '../../../../types/register.types';




type InputName = keyof RegisterForm;

type FormInput = HTMLInputElement & {
  name: InputName;
};

const initialValue: RegisterForm = {
  name_user: "",
  last_name: "",
  phone: "",
  email: "",
  province: "",
  city: "",
  password: "",
  rep_password: "",
};

const RegisterPage = () => {

  const [register, setRegister] = useState<RegisterForm>(initialValue);
  const [valErrors, setValErrors] = useState<RegisterErrors>({});
  const [fetchError, setFetchError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<FormInput>) => {
    const { name, value } = e.target;

    setRegister(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      registerSchema.parse(register);
      setOpenModal(true);

    } catch (error) {

      if (error instanceof ZodError) {

        const fieldsErrors: RegisterErrors = {};

        error.issues.forEach((elem) => {

          const field = elem.path[0] as keyof RegisterForm;

          fieldsErrors[field] = elem.message;
        });

        setValErrors(fieldsErrors);
        setFetchError("");

      } else {

        setValErrors({});

        const err = error as {
          response?: {
            data?: {
              errno?: number
            }
          }
        };

        setFetchError(
          err.response?.data?.errno === 1062
            ? "Email ya existe"
            : "Error al crear usuario"
        );
      }
    }
  };

  return (
    <section className='register-page'>
      <div className='register-card'>
        <h2>Registrate</h2>
        <form className='register-form' onClick={onSubmit}>

          <div className="field">
            <label htmlFor="name_user">Nombre</label>
            <input
              id='name_user'
              name='name_user'
              value={register.name_user}
              onChange={handleChange}
              autoComplete='given-name'
              placeholder='Introduce tu nombre'
            />
          </div>

          <div className="field">
            <label htmlFor="last_name">Apellidos</label>
            <input
              id='last_name'
              name='last_name'
              value={register.last_name}
              onChange={handleChange}
              autoComplete='family-name'
              placeholder='Introduce tus apellidos' />
          </div>

          <div className="field">
            <label htmlFor="Email">Email</label>
            <input
              id='email'
              name='email'
              value={register.email}
              onChange={handleChange}
              autoComplete='email'
              placeholder='Introduce tu Email' />
          </div>

          <div className="field">
            <label htmlFor="phone">Teléfono</label>
            <input
              id='phone'
              name='phone'
              value={register.phone}
              onChange={handleChange}
              autoComplete='tel'
              placeholder='Introduce tu Teléfono' />
          </div>

          <div className="field">
            <label htmlFor="city">Ciudad</label>
            <input
              id='city'
              name='city'
              value={register.city}
              onChange={handleChange}
              autoComplete='addres-level2'
              placeholder='Introduce Ciudad' />
          </div>

          <div className="field">
            <label htmlFor="province">Provincia</label>
            <input
              id='province'
              name='province'
              value={register.province}
              onChange={handleChange}
              autoComplete='address-level1'
              placeholder='Introduce Provincia' />
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id='password'
              name='password'
              value={register.password}
              onChange={handleChange}
              autoComplete='new-password'
              type="password"
              placeholder='Introduce una contraseña' />
          </div>

          <div className="field">
            <label htmlFor="rep_password">Repite contraseña</label>
            <input
              id='rep_password'
              name='rep_password'
              value={register.rep_password}
              onChange={handleChange}
              autoComplete='new-password'
              type="password"
              placeholder='Repite la contraseña' />
          </div>

          <div className="buttons">
            <button type='submit' className="button_register acept">
              Aceptar
            </button>

            <button
              type="button"
              className="button_register cancel"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </section>
  )
}

export default RegisterPage