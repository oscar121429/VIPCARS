import React, { useEffect, useState } from 'react'
import "./OneCarPage.css"
import { useNavigate, useParams } from 'react-router'
import { useAuth } from '../../../context/AuthContext/useAuth';
import { fetchData } from '../../../helpers/axiosHelper/axiosHelper';
import type { OneCarResponse, OneSocialCar } from '../../../types/OneCar.types';
import { Table } from 'react-bootstrap';

const OneCarPage = () => {
 const [oneCar, setOneCar] = useState<OneSocialCar | null>(null);
 const {car_id} = useParams();
 const {token} =  useAuth();

 const navigate = useNavigate();

  useEffect(()=>{
    const fetchCar = async()=>{
      try {
        const res = await fetchData<OneCarResponse>({
          url:`car/carById/${car_id}`,
          method: 'GET',
          token
        })

        setOneCar(res.car);

      } catch (error) {
        console.log(error);
        
      }
    }
    fetchCar();
  },[])

  return (
    <div className='OneCarPage'>
     <section className='heroImageWrap'>
  {oneCar?.main_image && (
    <img
      src={`${import.meta.env.VITE_SERVER_IMAGES}/cars/${oneCar.main_image}`}
      alt="imagen del coche"
      className='heroImage'
    />
  )}
</section>

    <section  className="CarInfoContainer">
      <div className="infoTableWrapC">
          <Table className="infoTable" borderless>
                  <tbody>
                    <tr>
                      <td className="infoKey">Modelo</td>
                      <td className="infoValue">
                        {oneCar?.model}
                      </td>
                    </tr>
                    <tr>
                      <td className="infoKey">Año</td>
                      <td className="infoValue">{oneCar?.year}</td>
                    </tr>
                    <tr>
                      <td className="infoKey">Precio</td>
                      <td className="infoValue">{oneCar?.price}€</td>
                    </tr>
                     <tr>
                      <td className="infoKey">Número de propietarios</td>
                      <td className="infoValue">{oneCar?.number_of_owners}</td>
                    </tr>
                      <tr>
                      <td className="infoKey">Kilómetros</td>
                      <td className="infoValue">{oneCar?.kilometres}km</td>
                    </tr>
                      <tr>
                      <td className="infoKey">Descripción</td>
                      <td className="infoValue">{oneCar?.description}</td>
                    </tr>
                  </tbody>
                </Table>
      </div>
    </section>

     <div className="d-flex justify-content-center py-5 "> 
      <button className="button_register acept" onClick={()=>navigate(-1)}>Volver</button>
      </div>

    </div>
  )
}

export default OneCarPage