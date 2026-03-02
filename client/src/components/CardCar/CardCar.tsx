import { useNavigate } from "react-router";
import type { SocialCar } from "../../types/SocialCar.types";
import "./CardCar.css"

type Props = {
  car: SocialCar;
};

export const CardCar = ({car}:Props) => {
  const navigate = useNavigate();
  return (
    <article className="social-card">

      
      <div className="car-header-img">
        
          <img
          onClick={()=>navigate(`/oneCar/${car.car_id}`)}
            src={`${import.meta.env.VITE_SERVER_IMAGES}/cars/${car.file}`}
            alt="car"
          />
      
      </div>

      
      <div className="user-info">
        {car?.picture_user ? (  
          <img
        onClick={()=>navigate(`/oneUser/${car.user_id}`)}
          className="user-avatar"
          src={`${import.meta.env.VITE_SERVER_IMAGES}/users/${car.picture_user}`}
          alt="user"
        />
      ) :  (
                   <img
                    onClick={()=>navigate(`/oneUser/${car.user_id}`)}
                  className="user-avatar"
                  src={`/images/Profile/IconDefect.png`}
                  alt="Imagen de perfil por defecto"
                />
                )}
        <p className="user-name">
          {car.name_user} {car.last_name}
        </p>
      </div>

      
      <div className="car-data">
        <h2>{car.model}</h2>
        <p className="price">{car.price} €</p>
        <p className="year">{car.year}</p>
      </div>

    </article>
  )
}
