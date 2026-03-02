import React, { useState } from 'react'
import "./AddCarPage.css"
import type { CarFormErrors, CarPictures, CreateCarDTO, CreateCarResponse, GetCarsByUserResponse } from '../../../types/addCar.types';
import { useNavigate } from 'react-router';
import { validateCar } from '../../../schemas/AddCarScherma';
import { fetchData } from '../../../helpers/axiosHelper/axiosHelper';
import { useAuth } from '../../../context/AuthContext/useAuth';


const initialValue: CreateCarDTO = {
  car_id: 0,
  model: '',
  year: new Date().getFullYear(),
  price: 0,
  number_of_owners: 0,
  kilometres: 0,
  description: '',
  user_id: 0,
}

const AddCarPage = () => {
  const [newCar, setNewCar] = useState<CreateCarDTO>(initialValue);
  const [pictures, setPictures] = useState<CarPictures>([]);
  const [errors, setErrors] = useState<CarFormErrors>({})

  const { token, user,  setCar } = useAuth();

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const target = e.target
    const name = target.name as keyof CreateCarDTO

    
    if (target instanceof HTMLInputElement && target.type === 'file') {

      if (!target.files) return
      setPictures(Array.from(target.files))
      return
    }

    
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

      
      const validationErrors = validateCar(newCar, pictures)

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }

      const formData = new FormData()

      
      formData.append("newCar", JSON.stringify(newCar));

     
      if (pictures && pictures.length > 0) {
        for (const elem of pictures) {
          formData.append("img", elem)
        }
      }

       await fetchData<CreateCarResponse, FormData>({
        url: "car/newCar",
        method: "POST",
        data: formData,
        token
      })

     
      if (!user) return;

      
      const resCars = await fetchData<GetCarsByUserResponse>({
        url: `car/getCarsByUser/${user!.user_id}`,
        method: "GET",
        token
      });

      setCar(resCars.car);


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

          <div className="field file-input">
            <label htmlFor="images" className="file-label">
              <i className="bi bi-card-image" ></i>
            </label>
            <input
              id='images'
              name='img'
              type='file'
              multiple
              onChange={handleChange}
              className="hidden-input"
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