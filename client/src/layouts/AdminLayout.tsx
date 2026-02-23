
import { Outlet } from 'react-router'
import { NavbarPrivado } from '../components/NavbarPrivado/NavbarPrivado'

export const AdminLayout = () => {
  return (
    <>
    <header className='header-public'>
    <NavbarPrivado />
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
