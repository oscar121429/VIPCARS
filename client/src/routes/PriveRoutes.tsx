
import { Outlet, useNavigate } from 'react-router'
import type { User } from '../types/auth.types';
import { useEffect } from 'react';

type PrivateRoutesProps = {
  user: User | null;
  requiredType: number;
};

export const PriveRoutes = ({
  user, 
  requiredType}:PrivateRoutesProps) => {

    const navigate = useNavigate()

    useEffect(()=>{
      if(user?.type !== requiredType) navigate('/')

    },[user])
  return (
    <>
      <Outlet/>
    </>
  )
}
