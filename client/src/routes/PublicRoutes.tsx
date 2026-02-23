
import { Outlet, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext/useAuth'
import { useEffect } from 'react';

export const PublicRoutes = () => {
 const {user} = useAuth();
 const navigate = useNavigate();

 useEffect(()=>{
   if (user) {
      if (user.type === 3) navigate('/social')
      if (user.type === 2) navigate('/manage')
    }
 },[user])
  return (
    <>
      <Outlet/>
    </>
  )
}
