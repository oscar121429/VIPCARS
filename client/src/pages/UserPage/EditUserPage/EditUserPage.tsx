
import { useNavigate } from 'react-router'
import "./EditUserPage.css"
import { useAuth } from '../../../context/AuthContext/useAuth';
import { useEffect, useState } from 'react';
import type { User } from '../../../types/auth.types';
import { fetchData } from '../../../helpers/axiosHelper/axiosHelper';

const EditUserPage = () => {
  const { user, token, setUser } = useAuth()
  const [editUser, setEditUser] = useState<User | null>(null)
  const [avatar, setAvatar] = useState<File | null>(null)

  const navigate = useNavigate();

  useEffect(() => {
    setEditUser(user);
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target

    if (type === 'file' && files) {
      setAvatar(files[0])
    } else {
      setEditUser(prev => {
        if (!prev) return prev
        return {
          ...prev,
          [name]: value
        }
      })
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newFormData = new FormData();
      newFormData.append("editUser", JSON.stringify(editUser));
      if (avatar) {
        newFormData.append("img", avatar);
      }

      const res = await fetchData<FormData, { message: string; newAvatar?: string }>({
        url: 'user/editUser',
        method: 'PUT',
        data: newFormData,  // Usar el FormData, no editUser
        token
      });

      if (res) {
        const baseUser = editUser as User;
        const updatedUser: User = {
          ...baseUser,
          picture_user: res.newAvatar ?? baseUser.picture_user
        };
        setUser(updatedUser);
        navigate('/profile');
      }


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className='register-page'>
      <div className='register-card'>
        <h2>Editar perfil</h2>
        <form className='register-form' onSubmit={onSubmit} encType="multipart/form-data">

          <div className="field">
            <label htmlFor="name_user">Nombre</label>
            <input
              id='name_user'
              name='name_user'
              value={editUser?.name_user ?? ''}
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
              value={editUser?.last_name ?? ''}
              onChange={handleChange}
              autoComplete='family-name'
              placeholder='Introduce tus apellidos' />
          </div>



          <div className="field">
            <label htmlFor="phone">Teléfono</label>
            <input
              id='phone'
              name='phone'
              value={editUser?.phone ?? ''}
              onChange={handleChange}
              autoComplete='tel'
              placeholder='Introduce tu Teléfono' />
          </div>

          <div className="field">
            <label htmlFor="city">Ciudad</label>
            <input
              id='city'
              name='city'
              value={editUser?.city ?? ''}
              onChange={handleChange}
              autoComplete='addres-level2'
              placeholder='Introduce Ciudad' />
          </div>

          <div className="field">
            <label htmlFor="province">Provincia</label>
            <input
              id='province'
              name='province'
              value={editUser?.province ?? ''}
              onChange={handleChange}
              autoComplete='address-level1'
              placeholder='Introduce Provincia' />
          </div>

          <div className="field">
            <label htmlFor="picture_user">Actualizar foto de perfil</label>
            <input
              id='picture_user'
              name='avatar'
              type='file'
              onChange={handleChange}
            />
          </div>


          <div className="buttons">
            <button type='submit' className="button_register acept">
              Aceptar
            </button>

            <button
              type="button"
              className="button_register cancel"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
          </div>

        </form>

      </div>
    </section>
  )
}

export default EditUserPage

