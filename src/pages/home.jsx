import React from 'react'
import hero from '../images/girl_main.jpg'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div
      className="hero-section d-flex align-items-end justify-content-end text-center"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '80vh', // Höhe des Abschnitts
      }}
    >
      <div className="card bg-light bg-opacity-75 p-4 shadow" style={{ maxWidth: '500px' }}>
        <h1 className="h3 mb-3">Anna friert.</h1>
        <p className="mb-3 text-muted">
          Registriere deine Spende und entscheide selbst, wohin sie geht.
        </p>
        <button
      className="btn"
      style={{ backgroundColor: '#c0392b', color: '#fff', border: 'none' }}
      onClick={() => navigate('/donate')}
    >
      Jetzt spenden
    </button>
      </div>
    </div>
  )
}