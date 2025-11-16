import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer bg-darkblue text-dark mt-5 pt-5 pb-4">
      <div className="container">

        {/* Grid: 3 Spalten */}
        <div className="row">

          {/* 1. Spalte – Kontakt */}
          <div className="col-md-4 mb-4">
            <h5 className="text-dark mb-3">Kontakt</h5>

            <p className="mb-2">
              📧 <strong>Email:</strong> spenden@martinus.de
            </p>

            <p className="mb-2">
              ☎️ <strong>Telefon:</strong> 0761 / 32 16 8
            </p>

            <p className="mb-2">
              📍 <strong>Adresse:</strong><br />
              Waldstraße 12<br />
              79104 Freiburg
            </p>
          </div>

          {/* 2. Spalte – Öffnungszeiten */}
          <div className="col-md-4 mb-4">
            <h5 className="text-dark mb-3">Öffnungszeiten</h5>

            <p className="mb-1">Mo–Fr: 10:00–17:00 Uhr</p>
            <p className="mb-1">Sa: 10:00–13:00 Uhr</p>
            <p className="text-muted small mt-3">
              Martinus Kleiderhilfe e.V.
            </p>
          </div>

          {/* 3. Spalte – Navigation */}
          <div className="col-md-4 mb-4">
            <h5 className="text-dark mb-3">Navigation</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <NavLink to="/" className="footer-link">Startseite</NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/donate" className="footer-link">Spende registrieren</NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/about" className="footer-link">Über uns</NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/contact" className="footer-link">Kontakt</NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/impressum" className="footer-link">Impressum</NavLink>
              </li>
            </ul>
          </div>

        </div>

        {/* Linie + Copyright */}
        <hr className="border-secondary mt-4" />

        <p className="text-center text-muted small mt-3 mb-0">
          © {new Date().getFullYear()} Martinus Kleiderhilfe e.V. – Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}