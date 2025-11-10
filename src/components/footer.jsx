import React from 'react'



export default function Footer() {
  return (
    <>
    <footer className="bg-light text-dark border-top mt-5 border border-3 border-success">
  <div className="container py-4">
    <div className="row">
      <div className="col-md-4 mb-3">
        <h6>Über uns</h6>
        <p className="small text-muted">Infos zum Verein und unseren Projekten.</p>
      </div>
      <div className="col-md-4 mb-3">
        <h6>Kontakt</h6>
        <p className="small text-muted mb-1">Email: info@meinverein.de</p>
        <p className="small text-muted">Tel: 01234 / 56789</p>
      </div>
      <div className="col-md-4 mb-3 text-md-end">
        <h6>Rechtliches</h6>
        <a href="/impressum" className="small text-muted text-decoration-none">Impressum</a>
      </div>
    </div>
  </div>
</footer>
    </>
  )
}