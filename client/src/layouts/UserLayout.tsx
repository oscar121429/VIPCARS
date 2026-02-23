
import { Outlet } from 'react-router'
import { NavbarPrivado } from '../components/NavbarPrivado/NavbarPrivado'

export const UserLayout = () => {
  return (
   <>
    <header>
     <NavbarPrivado />
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
