
import { Outlet } from 'react-router'
import { NavbarPrivado } from '../components/NavbarPrivado/NavbarPrivado'
import { Footer } from '../components/Footer/Footer'

export const UserLayout = () => {
  return (
   <>
    <header>
     <NavbarPrivado />
    </header>
    <main className='main-user'>
      <Outlet/>
    </main>
    <footer  /* className='footer-user' */>
      <Footer/>
    </footer>
   </>
  )
}
