import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../../context/AuthContext/useAuth"
import { useState } from "react";
import type { Car, UpdateCarResponse } from "../../../types/auth.types";
import "./EditCarPage.css"
import { fetchData } from "../../../helpers/axiosHelper/axiosHelper";

const EditCarPage = () => {
  const { car_id } = useParams();
  const { token, car, setCar } = useAuth();

  const selectedCar = car.find(
    c => c.car_id === Number(car_id)
  );

  const [editCar, setEditCar] = useState<Car | null>(
    selectedCar ?? null
  );

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { name, value } = e.target;

    setEditCar(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        [name]:
          name === "year" ||
            name === "price" ||
            name === "number_of_owners" ||
            name === "kilometres"
            ? Number(value)
            : value
      };
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editCar) return;
    try {
      const res = await fetchData<UpdateCarResponse, Car>({
        url: `car/updateCar/${car_id}`,
        method: "PUT",
        data: editCar,
        token
      });

      setCar(prev =>
        prev.map(c =>
          c.car_id === Number(res.updatedCar.car_id)
            ? { ...res.updatedCar, car_id: Number(res.updatedCar.car_id) }
            : c
        )
      );

      navigate("/profile");
    } catch (error) {
      console.log(error);

    }
  }


  return (
    <section className='register-page'>
      <div className='register-card'>
        <h2>Editar coche</h2>
        <form className='register-form' onSubmit={onSubmit}>

          <div className="field">
            <label htmlFor="model">Modelo</label>
            <input
              id='model'
              name='model'
              value={editCar?.model}
              onChange={handleChange}
              placeholder='Introduce el modelo'
            />
            {/*   {errors.model && <span className="error">{errors.model}</span>} */}
          </div>

          <div className="field">
            <label htmlFor="year">Año</label>
            <input
              type='number'
              id='year'
              name='year'
              value={editCar?.year}
              onChange={handleChange}
              placeholder='Introduce año de matriculación' />
            {/*  {errors.year && <span className="error">{errors.year}</span>} */}
          </div>



          <div className="field">
            <label htmlFor="price">Precio</label>
            <input
              type='number'
              id='price'
              name='price'
              value={editCar?.price}
              onChange={handleChange}
              placeholder='Introduce el precio' />
            {/*   {errors.price && <span className="error">{errors.price}</span>} */}
          </div>

          <div className="field">
            <label htmlFor="number_of_owners">Número de dueños que ha tenido el coche</label>
            <input
              type='number'
              id='number_of_owners'
              name='number_of_owners'
              value={editCar?.number_of_owners}
              onChange={handleChange}
              placeholder='Introduce el número de propietarios' />
            {/*   {errors.number_of_owners && <span className="error">{errors.number_of_owners}</span>} */}
          </div>

          <div className="field">
            <label htmlFor="kilometres">Kilómetros</label>
            <input
              type='number'
              id='kilometres'
              name='kilometres'
              value={editCar?.kilometres}
              onChange={handleChange}
              placeholder='Kilómetros' />
            {/*  {errors.kilometres && <span className="error">{errors.kilometres}</span>} */}
          </div>

          <div className="field">
            <label htmlFor="description">Descripción</label>
            <input
              id='description'
              name='description'
              value={editCar?.description}
              onChange={handleChange}
              placeholder='Descripción del coche' />
            {/*   {errors.description && <span className="error">{errors.description}</span>} */}
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

export default EditCarPage