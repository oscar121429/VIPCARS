import  { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { PublicRoutes } from './PublicRoutes'
import { PublicLayout } from '../layouts/PublicLayout'

//paginas públicas 
const HomePage = lazy(()=> import("../pages/PublicPages/HomePage/HomePage"))
const AboutPage = lazy(()=> import("../pages/PublicPages/AboutPage/AboutPage"))
const ErrorPage = lazy(()=> import("../pages/PublicPages/ErrorPage/ErrorPage"))
const RegisterPage = lazy(()=> import("../pages/PublicPages/AuthPage/RegisterPage/RegisterPage"))
const LoginPage = lazy(()=> import("../pages/PublicPages/AuthPage/LoginPage/LoginPage"))

export const AppRoutes = () => {
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

        {/* ruta para el error */}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Suspense>
    </BrowserRouter>
  )
}
