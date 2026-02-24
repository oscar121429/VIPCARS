
import { useAuth } from '../../context/AuthContext/useAuth'
import "./UserCarsGallery.css"

export const UserCarsGallery = () => {
 const {car} = useAuth();
 console.log("llega la info de car", car);
 
  return (
        <section className="cars-container">

      {car?.map((elem) => (
        <article className="car-card" key={elem.car_id}>

          <div className="car-header">

            <div className="car-info">
              <h3>{elem.model}</h3>
              <p>Año: {elem.year}</p>
            </div>

            <div className="car-actions">
              <i className="bi bi-pencil-square edit-icon"></i>
              <i className="bi bi-trash delete-icon"></i>
            </div>

          </div>

          <div className="car-gallery">
            
          </div>

        </article>
      ))}

    </section>
  )
}
