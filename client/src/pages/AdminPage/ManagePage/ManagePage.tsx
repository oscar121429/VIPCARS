import  { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext/useAuth'
import { fetchData } from '../../../helpers/axiosHelper/axiosHelper';
import type { AdminUser, AdminUsersResponse } from '../../../types/adminUser.types';
import "./ManagePage.css"

const ManagePage = () => {
  const [allUsers, setAllUsers] = useState<AdminUser[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetcAllUsers = async () => {
      try {
        const res = await fetchData<AdminUsersResponse>({
          url: 'admin/getAllUsers',
          method: 'GET',
          token
        })

        setAllUsers(res.users)

      } catch (error) {
        console.log(error);

      }
    }
    fetcAllUsers();
  }, [])


  const blockUser = async (user_id:number) => {
    try {
       await fetchData({
        url:`admin/blockUser/${user_id}`,
        method:'PUT',
        token
      })

        setAllUsers(prev =>
      prev.map(user =>
        user.user_id === user_id
          ? {...user, is_deleted: user.is_deleted === 0 ? 1 : 0}
          : user
      )
    );

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <section className='d-flex justify-content-center py-5'>
      <div className='adminUsersWrap'>
        <table className="adminTable" >

         
          <thead >
            <tr>
              <th>CLIENTE</th>
              <th>TELÉFONO</th>
              <th>E-MAIL</th>
              <th>ADMINISTRAR</th>
            </tr>
          </thead>

       
          <tbody>

            {allUsers.map((user) => (

              <tr key={user.user_id}>

               
                <td className="clientCell">

                  <div className="clientInfo">

                    <img
                      src={
                        user.picture_user
                          ? `${import.meta.env.VITE_SERVER_IMAGES}/users/${user.picture_user}`
                          : `/images/Profile/IconDefect.png`
                      }

                      className="clientAvatar"
                      alt="avatar"
                    />

                    <span>
                      {user.name_user} {user.last_name}
                    </span>

                  </div>

                </td>

                <td>
                  {user.phone}
                </td>

                <td>
                  {user.email}
                </td>

                <td>

                  <button
                    className="blockBtn"
                    onClick={() => blockUser(user.user_id)}
                  >
                    {user.is_deleted === 0 ? "BLOQUEAR" : "DESBLOQUEAR"}
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </section>
  )
}

export default ManagePage