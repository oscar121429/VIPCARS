import React, { useState } from 'react'
import "./AddCarPage.css"
import { CarFormErrors, CarPictures, CreateCarDTO } from '../../../types/addCar.types';
import { useNavigate } from 'react-router';
import { validateCar } from '../../../schemas/AddCarScherma';
import { fetchData } from '../../../helpers/axiosHelper/axiosHelper';
import { useAuth } from '../../../context/AuthContext/useAuth';

const initialValue: CreateCarDTO = {
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    number_of_owners: 0,
    kilometres: 0,
    description: ''
}

const AddCarPage = () => {
  const [newCar, setNewCar] = useState<CreateCarDTO>(initialValue);
  const [pictures, setPictures] = useState<CarPictures>([]);
  const [errors, setErrors] = useState<CarFormErrors>({})

 const {token, user, car, setCar} = useAuth();

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const target = e.target
    const name = target.name as keyof CreateCarDTO

    // 🔴 Caso imágenes
    if (target instanceof HTMLInputElement && target.type === 'file') {

      if (!target.files) return
      setPictures(Array.from(target.files))
      return
    }

    // 🟢 Caso normal
    const value = target.value

    setNewCar(prev => ({
      ...prev,
      [name]:
        name === 'year' ||
          name === 'price' ||
          name === 'number_of_owners' ||
          name === 'kilometres'
          ? Number(value)
          : value
    }))

    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  try {

    // 🟨 VALIDACIÓN
    const validationErrors = validateCar(newCar, pictures)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const formData = new FormData()

    // 🟩 OBJETO COMO JSON
    formData.append("newCar", JSON.stringify(newCar));

    // 🟦 IMÁGENES
    if (pictures && pictures.length > 0) {
      for (const elem of pictures) {
        formData.append("img", elem)
      }
    }

    const res = await fetchData<FormData>({ 
      url: "car/newCar",
      method: "POST",
      data: formData,
      token
    })

    console.log("como se esta creando el coche", res);
    

    //pendiente el seteo de car
    // supondremos que res.carId contiene el id del coche creado
/* if (res && res.carId) {
  const created = {
    car_id: String(res.carId),
    model: newCar.model,
    year: newCar.year,
    price: newCar.price,
    number_of_owners: newCar.number_of_owners,
    kilometres: newCar.kilometres,
    description: newCar.description
  };
  setCar(prev => prev ? [created, ...prev] : [created]);
} */

    navigate('/profile')

  } catch (error) {
    console.log(error)
  }
}

  return (
    <section className='register-page'>
      <div className='register-card'>
        <h2>Añadir coche</h2>
        <form className='register-form' onSubmit={onSubmit} encType="multipart/form-data">

          <div className="field">
            <label htmlFor="model">Modelo</label>
            <input
              id='model'
              name='model'
              value={newCar.model}
              onChange={handleChange}
              placeholder='Introduce el modelo'
            />
            {errors.model && <span className="error">{errors.model}</span>}
          </div>

          <div className="field">
            <label htmlFor="year">Año</label>
            <input
              type='number'
              id='year'
              name='year'
              value={newCar.year}
              onChange={handleChange}
              placeholder='Introduce año de matriculación' />
              {errors.year && <span className="error">{errors.year}</span>}
          </div>



          <div className="field">
            <label htmlFor="price">Precio</label>
            <input
              type='number'
              id='price'
              name='price'
              value={newCar.price}
              onChange={handleChange}
              placeholder='Introduce el precio' />
              {errors.price && <span className="error">{errors.price}</span>}
          </div>

          <div className="field">
            <label htmlFor="number_of_owners">Número de dueños que ha tenido el coche</label>
            <input
              type='number'
              id='number_of_owners'
              name='number_of_owners'
              value={newCar.number_of_owners}
              onChange={handleChange}
              placeholder='Introduce el número de propietarios' />
              {errors.number_of_owners && <span className="error">{errors.number_of_owners}</span>}
          </div>

          <div className="field">
            <label htmlFor="kilometres">Kilómetros</label>
            <input
              type='number'
              id='kilometres'
              name='kilometres'
              value={newCar.kilometres}
              onChange={handleChange}
              placeholder='Kilómetros' />
              {errors.kilometres && <span className="error">{errors.kilometres}</span>}
          </div>

          <div className="field">
            <label htmlFor="description">Descripción</label>
            <input
              id='description'
              name='description'
              value={newCar.description}
              onChange={handleChange}
              placeholder='Descripción del coche' />
              {errors.description && <span className="error">{errors.description}</span>}
          </div>

          <div className="field">
            <label htmlFor="images">Añadir foto</label>
            <input
              id='images'
              name='img'
              type='file'
              multiple
              onChange={handleChange}
            />
            {errors.pictures && <span className="error">{errors.pictures}</span>}
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

export default AddCarPage