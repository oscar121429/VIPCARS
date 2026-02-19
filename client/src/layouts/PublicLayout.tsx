import React from 'react'
import { Outlet } from 'react-router'
import { NavbarPublic } from '../components/NavbarPublic/NavbarPublic'

export const PublicLayout = () => {
  return (
    <>
    <header className='header-public'>
    <NavbarPublic />
   </header>

   <main className='main-public'>
    <Outlet/>
   </main>

   <footer className='footer-public'>
    <h2>Footer publico</h2>
   </footer>
    </>
  )
}
