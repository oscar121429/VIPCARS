
import { Outlet } from 'react-router'
import { NavbarPrivado } from '../components/NavbarPrivado/NavbarPrivado'
import { Footer } from '../components/Footer/Footer'

export const AdminLayout = () => {
  return (
    <>
    <header className='header-public'>
    <NavbarPrivado />
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
