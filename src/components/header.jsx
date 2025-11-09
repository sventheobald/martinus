import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../images/logo_final.png'

function Header() {
        return (
        <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
  <a className="navbar-brand d-flex align-items-center" href="#">
  <img
    src={logo}
    alt="Logo"
    width="200"
    height="200"
    className="d-inline-block align-top me-2"
  />
  
</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
      <li className="nav-item">
              <NavLink className="nav-link" to="/">Start</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/donate">Spenden</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">Über uns</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Kontakt</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/impressum">Impressum</NavLink>
            </li>
      </ul>
    </div>
  </div>
</nav>
        );
    }


export default Header;