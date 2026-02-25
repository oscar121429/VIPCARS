import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext/useAuth'
import { fetchData } from '../../../helpers/axiosHelper/axiosHelper';
import type{ AllUsersCarsResponse, SocialCar } from '../../../types/SocialCar.types';
import { CardCar } from '../../../components/CardCar/CardCar';

const RedSocial = () => {
 const [allCars, setAllCars] = useState<SocialCar[]>([]);
 const {token} = useAuth();

 useEffect(()=>{
  const fetchAllCars = async()=>{
    try {
      const res = await fetchData<AllUsersCarsResponse>({
        url:'user/allUsersCars',
        method:'GET',
        token
      })
      
      setAllCars(res.result);

    } catch (error) {
      console.log(error);
      
    }
  }
  fetchAllCars();
  

 },[])

 console.log("pppppppppppppppp que llega", allCars);
 
 

  return (
    <div className='d-flex justify-content-center gap-3 py-5 flex-column'>
      {allCars.map((elem)=>{
        return(
           <CardCar key={elem.car_id} car={elem} />
        )
      })}
     
    </div>
  )
}

export default RedSocial