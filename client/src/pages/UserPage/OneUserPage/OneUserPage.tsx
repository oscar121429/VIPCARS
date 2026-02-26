import { useEffect, useState } from "react"
import { useParams } from "react-router";
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
         <img
                  className="userPhoto"
                  src={`${import.meta.env.VITE_SERVER_IMAGES}/users/${oneUser?.picture_user}`}
                  alt="Imagen de perfil"
                />
         <div className="infoTableWrapU">
              <Table className="infoTable" borderless>
                <tbody>
                  <tr>
                    <td className="infoKey">Coleccionista</td>
                    <td className="infoValue">
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

    </div>
  )
}

export default OneUserPage