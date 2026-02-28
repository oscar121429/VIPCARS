import { useNavigate } from "react-router"
import "./footer.css"

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <section className="footer">
  <div className="footerContainer">

    <div className="footerBrand">
      <h3>VipCars</h3>
      <p>Comparte tu máquina. Descubre otras.</p>
    </div>

    <div className="footerLinks">
      <h5>Comunidad</h5>
      <ul>
        <li onClick={()=>navigate('/social')}>Explorar coches</li>
        <li>Ranking semanal</li>
        <li>Últimos añadidos</li>
        <li>Eventos</li>
      </ul>
    </div>

    <div className="footerLinks">
      <h5>Plataforma</h5>
      <ul>
        <li onClick={()=>navigate('/profile')}>Mi garaje</li>
        <li onClick={()=>navigate('/addCar')}>Subir coche</li>
        <li onClick={()=>navigate('/editUser')}>Editar perfil</li>
        <li>Soporte</li>
      </ul>
    </div>

    <div onClick={()=>navigate('/register')} className="footerNewsletter">
      <h5>Únete a VipCars</h5>
     
    </div>

  </div>

  <div className="subFooter">
    © 2026 VijCars — Todos los derechos reservados
  </div>
</section>
  )
}
