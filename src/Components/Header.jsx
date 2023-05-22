import React, { useContext } from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap';
import './header.css'
import { UserContext } from '../UserContext';

const Header = () => {
  const {user} = useContext(UserContext)
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#" style={{color:"#293855"}}>
        <span style={{paddingRight:"250px"}}><i className="fa-brands fa-pied-piper h1"></i> <i style={{fontWeight:"500"}} className="">RSO</i></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <div className="searchContainer mx-5 me-auto text-center   ">
          <div className="px-3 pt-1">Anywhere</div>
          <span className=" border border-secondary border-left"></span>
          <div className="px-3 pt-1">Anyweek</div>
          <span className=" border border-secondary border-left "></span>
          <div className="px-3 pt-1 text-secondary">Add guest</div>
          <button className="px-3 pt-1 ">
            <i className="fas fa-search"></i>
          </button>
        </div>
          <Nav className="ms-auto  my-2 px-5 " navbarScroll>
            <Nav.Link href={user? "/account" : "/login"}>
            <i style={{color:"#293855"}} className="fa fa-bars h2 pt-1 px-2"></i>
              <i style={{color:"#293855"}} className="fa fa-user-circle h2 pt-1"></i>
              {!!user && (
                <div>
                  {user.name}
                </div>
              )}
            </Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header