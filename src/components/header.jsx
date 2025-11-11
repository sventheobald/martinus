import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../images/logo_final.png'

function Header() {
  const [shrink, setShrink] = useState(false)        // Logo verkleinern
  const [hideLinks, setHideLinks] = useState(false)  // Nav-Links verstecken
  const lastY = useRef(0)
  const HIDE_AFTER = 20; // statt 120
  useEffect(() => {
    lastY.current = window.scrollY;
  
    const onScroll = () => {
      const y = window.scrollY;
      const scrollingDown = y > lastY.current;
      const doc = document.documentElement;
      const atBottom = Math.ceil(y + window.innerHeight) >= doc.scrollHeight - 10;
  
      setShrink(y > 60);
  
      // sanftere Schwelle
      if (scrollingDown && y > 120 && !atBottom) {
        setHideLinks(true);      // runter -> ausblenden
      } else if (!scrollingDown) {
        setHideLinks(false);     // hoch -> wieder einblenden
      }
  
      lastY.current = y;
    };
  
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top transition-navbar ${
        hideLinks ? 'navbar--logo-only' : ''
      }`}
    >
      <div className="container-fluid">
        {/* Logo bleibt immer sichtbar */}
        <div id="logo-area" className="position-relative d-flex align-items-center">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo}
              alt="Logo"
              width="100"
              height="100"
              className={`brand-logo ${shrink ? 'brand-logo--small' : ''}`}
            />
          </NavLink>
  
          {/* Dropdown unter Logo */}
          <div className={`logo-dropdown ${!shrink ? 'd-none' : ''}`}>
            <ul>
              <li><NavLink to="/donate">Spenden</NavLink></li>
              <li><NavLink to="/about">Über uns</NavLink></li>
              <li><NavLink to="/contact">Kontakt</NavLink></li>
              <li><NavLink to="/impressum">Impressum</NavLink></li>
            </ul>
          </div>
        </div>
  
        {/* Menü-Block, der verschwindet */}
        <div className={`nav-section ${hideLinks ? 'nav-section--hidden' : ''}`}>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav ms-auto text-end">
              <li className="nav-item"><NavLink className="nav-link" to="/">Start</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/donate">Spenden</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/about">Über uns</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/contact">Kontakt</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/impressum">Impressum</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
    }


export default Header;