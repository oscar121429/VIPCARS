import type { SocialCar } from "../../types/SocialCar.types";
import "./CardCar.css"

type Props = {
  car: SocialCar;
};

export const CardCar = ({car}:Props) => {
  return (
    <article className="social-card">

      {/* Imagen del coche */}
      <div className="car-header-img">
        <img 
          src={`${import.meta.env.VITE_SERVER_IMAGES}/cars/${car.file}`} 
          alt="car"
        />
      </div>

      {/* Info usuario */}
      <div className="user-info">
        <img
          className="user-avatar"
          src={`${import.meta.env.VITE_SERVER_IMAGES}/users/${car.picture_user}`}
          alt="user"
        />
        <p className="user-name">
          {car.name_user} {car.last_name}
        </p>
      </div>

      {/* Info coche */}
      <div className="car-data">
        <h2>{car.model}</h2>
        <p className="price">{car.price} €</p>
        <p className="year">{car.year}</p>
      </div>

    </article>
  )
}
