import  { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { PublicRoutes } from './PublicRoutes'
import { PublicLayout } from '../layouts/PublicLayout'
import { PriveRoutes } from './PriveRoutes'
import { UserLayout } from '../layouts/UserLayout'
import { AdminLayout } from '../layouts/AdminLayout'
import { useAuth } from '../context/AuthContext/useAuth'

//paginas públicas 
const HomePage = lazy(()=> import("../pages/PublicPages/HomePage/HomePage"));
const AboutPage = lazy(()=> import("../pages/PublicPages/AboutPage/AboutPage"));
const ErrorPage = lazy(()=> import("../pages/PublicPages/ErrorPage/ErrorPage"));
const RegisterPage = lazy(()=> import("../pages/PublicPages/AuthPage/RegisterPage/RegisterPage"));
const LoginPage = lazy(()=> import("../pages/PublicPages/AuthPage/LoginPage/LoginPage"));

//páginas privadas user
const RedSocial = lazy(()=>import("../pages/UserPage/RedSocial/RedSocial"));
const ProfilePage = lazy(()=>import("../pages/UserPage/ProfilePage/ProfilePage"));
const OneCarPage = lazy(()=>import("../pages/UserPage/OneCarPage/OneCarPage"));
const OneUserPage = lazy(()=>import("../pages/UserPage/OneUserPage/OneUserPage"));
const EditUserPage = lazy(()=>import("../pages/UserPage/EditUserPage/EditUserPage"));
const AddCarPage = lazy(()=>import("../pages/UserPage/AddCarPage/AddCarPage"));
const EditCarPage = lazy(()=>import("../pages/UserPage/EditCarPage/EditCarPage"));

//página privada Admin
const ManagePage = lazy(()=>import("../pages/AdminPage/ManagePage/ManagePage"));

export const AppRoutes = () => {
 const {user} = useAuth();
  return (
    <BrowserRouter>
    <Suspense fallback={<h1>Cargando...</h1>}>
      <Routes>
        {/* rutas públicas */}
        <Route element={<PublicRoutes />} >
          <Route element={<PublicLayout />} >

            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/login' element={<LoginPage/>} />

          </Route>
        </Route>

        {/* rutas privadas user */}
        <Route element={<PriveRoutes  user={user} requiredType={3}/>} >
          <Route element={<UserLayout/>} >

          <Route path='/social' element={<RedSocial/>} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/oneCar' element={<OneCarPage />} />
          <Route path='/oneUser' element={<OneUserPage/>} />
          <Route path='/editUser' element={<EditUserPage/>} />
          <Route path='/addCar' element={<AddCarPage/>} />
          <Route path='/editCar/:car_id' element={<EditCarPage/>} />

          </Route>
        </Route>

        {/* ruta privada admin */}
        <Route element={<PriveRoutes user={user} requiredType={2}/>} >
          <Route element={<AdminLayout />} >

          <Route path='/manage' element={<ManagePage/>} />
         
          </Route>
        </Route>

        {/* ruta para el error */}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Suspense>
    </BrowserRouter>
  )
}
