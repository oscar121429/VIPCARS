import React from 'react'
import { Outlet } from 'react-router'

export const AdminLayout = () => {
  return (
    <>
    <header className='header-public'>
    <h1>Navbar Admin/ privado</h1>
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
