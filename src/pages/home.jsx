import React from 'react'
import hero from '../images/girl_main.jpg'
import team from '../images/team.png'
import ImageGrid from '../components/ImageGrid.jsx'
import martin from '../images/martin.png'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="home-page">
      <section
      className="hero-section d-flex align-items-end justify-content-end text-center"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '80vh',
        marginTop: '120px'
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
      </section>    

<div style={{ backgroundColor: '#0b132b', height: '100px' }}></div>

<section
  className="container-fluid py-5 d-flex align-items-end pb-5"
  style={{
    backgroundImage: `url(${team})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    minHeight: '80vh',
    color: 'white',
    marginTop: '30px'
  }}
>
  <div
    className="position-absolute start-50 translate-middle-x"
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
      padding: '2rem',
      borderRadius: '0.75rem',
      maxWidth: '720px',
    }}
  >
    <h2 className="mb-2 fw-semibold fs-3 text-start">Gemeinsam helfen</h2>
    <p className="fs-6 mb-0 text-start">
      Seite an Seite mit engagierten Menschen auf der ganzen Welt bringen wir nicht nur Kleidung,
      sondern auch Hoffnung und ein Lächeln dorthin, wo es am dringendsten gebraucht wird.
    </p>
    <button
      className="btn"
      style={{ backgroundColor: '#c0392b', color: '#fff', border: 'none' }}
      onClick={() => navigate('/about')}
    >
      Mehr
    </button>
  </div>
</section>

<section
  className="hero-section d-flex align-items-end justify-content-end text-center position-relative"
  style={{
    backgroundImage: `url(${martin})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    minHeight: '80vh',
    marginTop: '40px'
  }}
>

  {/* Card-Layout wie beim ersten Hero */}
  <div
    className="hero-card p-4 shadow position-relative"
    style={{
      maxWidth: '500px',
    margin: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // halbtransparent wie oben
    backdropFilter: 'blur(4px)',                   // sanftes Glas-Gefühl (optional)
    border: 'none', 
    marginTop: '40px'
    }}
  >
    <h2 className="h3 mb-3 text-dark">Sei wie Martin</h2>
    <p className="mb-3 text-muted">
      Werde Teil unseres Teams und helfe, wo es am Nötigsten ist.
    </p>
    <button
      className="btn"
      style={{
        backgroundColor: '#c0392b',
        color: '#fff',
        border: 'none',
      }}
      onClick={() => navigate('/contact')}
    >
      Kontaktiere uns
    </button>
  </div>
</section>



<section style={{ marginTop: '40px' }} ><ImageGrid />
</section>
    </div>
  )
}