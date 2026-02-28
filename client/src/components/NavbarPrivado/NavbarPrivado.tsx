
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../../context/AuthContext/useAuth";
import "./NavbarPrivado.css"



export const NavbarPrivado = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate();

  const isAdmin = user?.type === 2;
  return (
    <Navbar expand="lg" className="navbar-custtom">
      <Container>
        <Navbar.Brand as={Link} to={"/"} className=' pe-5 ps-0 fs-1  logo'>VipCars</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* solo admin */}
            {isAdmin && (
              <Nav.Link as={Link} to={"/manage"}>
                Dashboard
              </Nav.Link>
            )}
            <Nav.Link as={Link} to={"/social"}>Red Social</Nav.Link>
          </Nav>
          <div className='d-flex gap-1 '>
            <div className='d-flex align-items-center gap-1 '>
              <p className='m-1'>{user?.name_user}  {user?.last_name && user.last_name} </p>
              {user?.picture_user ? <img
                className='avatar_img'
                onClick={() => navigate('/profile')}
                src={`http://localhost:4000/images/users/${user.picture_user}`} /> : <div className='nav-avatar-letra m-2'
                  onClick={() => navigate('/profile')}
                >
                {user?.name_user[0].toUpperCase()} </div>}
            </div>
            <Button className='nav-btn m-2' onClick={logout}>
              <i className="bi bi-box-arrow-right "></i>
            </Button>
          </div>


        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
