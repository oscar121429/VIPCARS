import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../../context/AuthContext/useAuth";
import { fetchData } from "../../../helpers/axiosHelper/axiosHelper";
import type { OneUserResponse,  SocialProfile } from "../../../types/OneUser.types";
import { Table } from "react-bootstrap";
import "./OneUserPage.css"
import { CarCarousel } from "../../../components/CarCarousel/CarCarousel";


const OneUserPage = () => {
 const [oneUser, setOneUser] = useState<SocialProfile | null>(null);
 const {user_id} = useParams();
 const {token} =  useAuth();

 const navigate = useNavigate();

  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const res = await fetchData<OneUserResponse>({
          url:`user/userById/${user_id}`,
          method:'GET',
          token
        })

        setOneUser(res.userProfile);

      } catch (error) {
        console.log(error);
        
      }
    }
    fetchUser();
  },[])

  return (
    <div>
      <section className="userInfoContainer">
      {oneUser?.picture_user ? (  
        <img
                  className="userPhoto"
                  src={`${import.meta.env.VITE_SERVER_IMAGES}/users/${oneUser?.picture_user}`}
                  alt="Imagen de perfil"
                />
                ) : (
                   <img
                  className="userPhoto"
                  src={`/images/Profile/IconDefect.png`}
                  alt="Imagen de perfil por defecto"
                />
                )}
         <div className="infoTableWrapU">
              <Table className="infoTableU" borderless>
                <tbody>
                  <tr>
                    <td className="infoKeyU">Coleccionista</td>
                    <td className="infoValueU">
                      {oneUser?.name_user} {oneUser?.last_name}
                    </td>
                  </tr>
                  
                </tbody>
              </Table>
            </div>
      </section>

      <section className="d-flex justify-content-center py-5">
      <CarCarousel  images={oneUser?.images ?? []}/>
      </section>

      <div className="d-flex justify-content-center py-5 "> 
      <button className="button_register acept" onClick={()=>navigate(-1)}>Volver</button>
      </div>

    </div>
  )
}

export default OneUserPage