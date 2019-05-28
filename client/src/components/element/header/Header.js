import React from 'react';
import RBLOGO from './rb.jpg'
import './Header.css';
import { Navbar } from 'react-bootstrap';

const Header = () => (
  <div>
      <Navbar bg="dark" expand="lg" >
          <Navbar.Brand href="#home"><img  className="d-inline-block align-top" src={ RBLOGO } alt={ 'rblogo' } /><span
            className="name" style={{color: "white"}}>ROGER BRYANT</span><span style={{color: "white"}}>  | </span><span className="email" style={{color: "white"}}>ROGER@FORESTGEEK.COM</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          </Navbar.Collapse>
      </Navbar>
  </div>
        );

export default Header;
