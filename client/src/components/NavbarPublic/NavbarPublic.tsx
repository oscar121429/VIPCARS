
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import "./NavbarPublic.css"
import { Link, useNavigate } from 'react-router'

export const NavbarPublic = () => {

  const navigate = useNavigate()

  return (
       <Navbar expand="lg" className="navbar-custtom">
      <Container>
        <Navbar.Brand as={Link} to={"/"} className=' pe-5 ps-0 fs-1  logo'>VipCars</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
            <Nav.Link as={Link} to={"/about"}>About</Nav.Link>
          </Nav>
          <div>
             <Button className='nav-btn m-2' onClick={()=>navigate('/register')}>Register</Button>
            <Button className='nav-btn' onClick={()=>navigate('/login')}>Login</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
