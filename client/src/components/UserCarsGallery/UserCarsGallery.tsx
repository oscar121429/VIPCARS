
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext/useAuth'
import { fetchData } from '../../helpers/axiosHelper/axiosHelper';
import type { Car } from '../../types/auth.types';
import { CarsPicGallery } from '../CarPicsGallery/CarsPicGallery';
import "./UserCarsGallery.css"

export const UserCarsGallery = () => {
 const {car, setCar, token} = useAuth();
 const navigate = useNavigate();
 
 const delLogicCar = async(car_id: Car["car_id"] )=>{
  try {
    let res = await fetchData({
      url:`car/delLogicCar/${car_id}`,
      method: 'PUT',
      token
    })

    setCar(car.filter(elem => elem.car_id !== car_id));

  } catch (error) {
    console.log(error);
    
  }
 }
  return (
        <section className="d-flex justify-content-between flex-column gap-3">

      {car?.map((elem) => (
        <article className="car-card" key={elem.car_id}>

          <div className="car-header">

            <div className="car-info">
              <h3>{elem.model}</h3>
              <p>Año: {elem.year}</p>
            </div>

            <div className="car-actions">
              <i className="bi bi-pencil-square edit-icon"
              onClick={()=>navigate(`/editCar/${elem.car_id}`)}></i>

              <i className="bi bi-trash delete-icon" 
              onClick={()=>delLogicCar(elem.car_id)}></i>
            </div>

          </div>

          <div className="car-gallery">
            <CarsPicGallery
            
            car_id={elem.car_id}
             />
          </div>

        </article>
      ))}

    </section>
  )
}
