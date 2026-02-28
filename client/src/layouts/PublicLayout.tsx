import React from 'react'
import { Outlet } from 'react-router'
import { NavbarPublic } from '../components/NavbarPublic/NavbarPublic'
import { Footer } from '../components/Footer/Footer'

export const PublicLayout = () => {
  return (
    <>
    <header className='header-public'>
    <NavbarPublic />
   </header>

   <main className='main-public'>
    <Outlet/>
   </main>

   <footer /* className='footer-public' */>
    <Footer/>
   </footer>
    </>
  )
}
