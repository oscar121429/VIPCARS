import React from 'react'
import { Outlet } from 'react-router'

export const UserLayout = () => {
  return (
   <>
    <header>
     <h1>Navbar user/privado</h1>
    </header>
    <main className='main-user'>
      <Outlet/>
    </main>
    <footer  className='footer-user'>
      <h2>Footer user</h2>
    </footer>
   </>
  )
}
