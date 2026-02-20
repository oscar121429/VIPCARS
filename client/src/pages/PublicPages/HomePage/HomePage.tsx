import { Link } from 'react-router'
import "./HomePage.css"


const HomePage = () => {
  return (
     <section className='d-flex justify-content-center py-5'>

       <section className="home__grid">

            <Link to="/register"  className="grid__item grid__item--1">
              <img src="/images/Home/home3.jpg" alt="car1" />
              <div className="overlay">
              <span>Únete a nuestra comunidad</span>
            </div>
            </Link>

            <Link to="/register" className="grid__item grid__item--2">
              <img src="/images/Home/home2.jpg" alt="car2" />
              <div className="overlay">
              <span>Únete a nuestra comunidad</span>
            </div>
            </Link>

            <Link to="/register" className="grid__item grid__item--3">
              <img src="/images/Home/home1.jpg" alt="car3" />
               <div className="overlay">
              <span>Únete a nuestra comunidad</span>
            </div>
            </Link>

          </section>

     </section>
  )
}

export default HomePage