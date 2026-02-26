import { Table } from "react-bootstrap"
import { useAuth } from "../../../context/AuthContext/useAuth"
import "./ProfilePage.css"
import { useNavigate } from "react-router"
import { UserCarsGallery } from "../../../components/UserCarsGallery/UserCarsGallery"


const ProfilePage = () => {
 const {user} = useAuth();
 const navigate = useNavigate();
  return (
    <> 
      <section className="clientProfilePage">
        <div className="infoCard">
          <div className="infoLeft">
            <div className="infoHeader">
              <h2 className="infoTitle">Información</h2>
              <button
                type="button"
                className="editBtn"
                onClick={()=>navigate('/editUser')}
              >
                ✎ Editar
              </button>
            </div>
            <div className="infoTableWrap">
              <Table className="infoTable" borderless>
                <tbody>
                  <tr>
                    <td className="infoKey">Nombre</td>
                    <td className="infoValue">
                      {user?.name_user} {user?.last_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="infoKey">Correo</td>
                    <td className="infoValue">{user?.email}</td>
                  </tr>
                  <tr>
                    <td className="infoKey">Teléfono</td>
                    <td className="infoValue">{user?.phone}</td>
                  </tr>
                   <tr>
                    <td className="infoKey">Ciudad</td>
                    <td className="infoValue">{user?.city}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        <div className="infoRight">
          <div className="userPhoto">
            <span>
              {user && user.picture_user ? (
                <img
                  className="userPhoto"
                  src={`${import.meta.env.VITE_SERVER_IMAGES}/users/${user.picture_user}`}
                  alt="Imagen de perfil"
                />
              ) : (
                <img
                  className="userPhoto"
                  src={`/images/Profile/IconDefect.png`}
                  alt="Imagen de perfil por defecto"
                />
              )}
            </span>
          </div>
        </div>
      </section>

      <section className="clientProfileCars">
       <div className="infoHeader">
         
           <h3 className="infoTitle">Colección personal</h3> 
         
         <button className="editBtn" onClick={()=>navigate('/addCar')}>
           <i  className="bi bi-car-front-fill"></i>
           <i className="bi bi-plus-circle"></i>
         </button>
       </div>

              <div className="conteiner-car">
                <UserCarsGallery/>
              </div>

       
      </section>

    </>
  )
}

export default ProfilePage