import React, { useState } from 'react'
import { Truck, House } from 'react-bootstrap-icons'
import worldmap from '../images/world.png'
import thankyou from '../images/thankyou.png'

const REGIONS = [
  // Venezuela – passt
  { id: 'venezuela', label: 'Venezuela', x: '32%', y: '58%' },

  // Gaza / Israel – korrigiert
  { id: 'gaza', label: 'Gaza', x: '50.7%', y: '48%' },

  // Sudan – ok
  { id: 'sudan', label: 'Sudan', x: '52%', y: '54%' },

  // Ukraine – korrigiert
  { id: 'ukraine', label: 'Ukraine', x: '55%', y: '42%' },

  // Afghanistan – minimal geshiftet
  { id: 'afghanistan', label: 'Afghanistan', x: '60%', y: '46%' },

  // Myanmar – korrigiert
  { id: 'myanmar', label: 'Myanmar', x: '68%', y: '55%' },
];

function getSuggestedAddresses(zipPrefix) {
  const p = zipPrefix || '12'
  return [
    `${p}345 – Kleiderkammer ${p}-Nord, Beispielstraße 12`,
    `${p}678 – Sozialzentrum ${p}-Mitte, Musterallee 5`,
    `${p}901 – Notlager ${p}-Süd, Bergstraße 40`,
  ]
}

export default function Donate() {
  const [step, setStep] = useState(1)
  const [selectedRegion, setSelectedRegion] = useState('')
  const [pickupType, setPickupType] = useState('') // 'abholung' | 'lieferung'
  const [abholAdresse, setAbholAdresse] = useState({
    street: '',
    zip: '',
    city: '',
  })
  const [plzLieferung, setPlzLieferung] = useState('')
  const [selectedAddress, setSelectedAddress] = useState('')
  const [date, setDate] = useState('')
  const [timeWindow, setTimeWindow] = useState('')

  const totalSteps = 5

  const zipPrefix = plzLieferung.slice(0, 2)
  const adressVorschlaege = getSuggestedAddresses(zipPrefix || '12')

  const isValidPlz =
    plzLieferung.length === 5 && /^[0-9]+$/.test(plzLieferung)

  return (
    <div className="donate-page">
      <div className="container py-5">

        {/* Fortschrittsbalken in weißer Card */}
<div className="step-header mb-4">
  <div className="progress" style={{ height: '8px' }}>
    <div
      className="progress-bar bg-danger"
      style={{ width: `${(step / totalSteps) * 100}%` }}
    ></div>
  </div>
  <p className="text-center mt-2 text-muted">
    Schritt {step} von {totalSteps}
  </p>
</div>

        {/* STEP 1 – Krisengebiet wählen (Weltkarte) */}
{step === 1 && (
  <div className="card shadow-lg border-0 p-3 pt-2 map-card mt-n4">
    <h2 className="h4 text-center mb-2">Welches Krisengebiet möchtest du unterstützen?</h2>
<p className="text-center text-muted mb-2">
  Tippe auf einen Punkt auf der Karte, um ein Krisengebiet zu wählen.
</p>

    {/* Karte */}
    <div className="position-relative map-wrapper">
      <img src={worldmap} alt="Weltkarte" className="img-fluid world-map" />

      {/* Punkte */}
      {REGIONS.map((r) => (
        <button
          key={r.id}
          type="button"
          className={`map-dot ${selectedRegion === r.id ? 'active' : ''}`}
          style={{ left: r.x, top: r.y }}
          onClick={() => setSelectedRegion(r.id)}
        />
      ))}

      {/* Label */}
      {selectedRegion && (
        <div className="map-label">
          {REGIONS.find((r) => r.id === selectedRegion)?.label}
        </div>
      )}
    </div>

    <div className="d-flex justify-content-end mt-4">
      <button
        className="btn"
        style={{ backgroundColor: '#c0392b', color: '#fff' }}
        disabled={!selectedRegion}
        onClick={() => setStep(2)}
      >
        Weiter
      </button>
    </div>
  </div>
)}

        {/* STEP 2 – Abholung oder Lieferung */}
        {step === 2 && (
          <div className="step-card">
            <h2 className="h4 text-center mb-4">
              Wie möchtest du deine Spende übergeben?
            </h2>
            <div className="row g-4 justify-content-center">
              {/* Abholung */}
              <div className="col-md-5">
                <div
                  className={`select-card ${
                    pickupType === 'abholung' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setPickupType('abholung')
                    setStep(3)
                  }}
                >
                  <Truck size={50} className="mb-3" />
                  <h5>Abholung bei mir</h5>
                  <p className="small text-muted">
                    Wir holen die Kleiderspende bei dir zu Hause ab.
                  </p>
                </div>
              </div>
              {/* Lieferung */}
              <div className="col-md-5">
                <div
                  className={`select-card ${
                    pickupType === 'lieferung' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setPickupType('lieferung')
                    setStep(3)
                  }}
                >
                  <House size={50} className="mb-3" />
                  <h5>Ich liefere selbst ab</h5>
                  <p className="small text-muted">
                    Du gibst deine Spende bei uns ab.
                  </p>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-back"
                onClick={() => setStep(1)}
              >
                Zurück
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 – Abholadresse ODER PLZ für Lieferung */}
        {step === 3 && pickupType === 'abholung' && (
          <div className="step-card">
            <h2 className="h4 mb-3">Wo sollen wir die Spende abholen?</h2>
            <p className="text-muted mb-4">
              Bitte gib die Abholadresse an. Die PLZ sollte im gleichen Bereich liegen wie unsere Geschäftsstelle.
            </p>

            <div className="mb-2 plz-input">
              <label className="form-label">Straße & Hausnummer *</label>
              <input
                type="text"
                className="form-control"
                value={abholAdresse.street}
                onChange={(e) =>
                  setAbholAdresse((prev) => ({
                    ...prev,
                    street: e.target.value,
                  }))
                }
              />
            </div>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">PLZ *</label>
                <input
                  type="text"
                  className="form-control"
                  value={abholAdresse.zip}
                  onChange={(e) =>
                    setAbholAdresse((prev) => ({
                      ...prev,
                      zip: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-md-8">
                <label className="form-label">Ort *</label>
                <input
                  type="text"
                  className="form-control"
                  value={abholAdresse.city}
                  onChange={(e) =>
                    setAbholAdresse((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-back"
                onClick={() => setStep(2)}
              >
                Zurück
              </button>
              <button
                className="btn"
                style={{ backgroundColor: '#c0392b', color: '#fff' }}
                onClick={() => setStep(4)}
                disabled={
                  !abholAdresse.street ||
                  !abholAdresse.zip ||
                  !abholAdresse.city
                }
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {step === 3 && pickupType === 'lieferung' && (
          <div className="step-card">
            <h2 className="h4 mb-3">Wie lautet deine Postleitzahl?</h2>
            <p className="text-muted mb-3">
              Wir schlagen dir Sammelstellen im gleichen PLZ-Bereich vor (gleiche ersten zwei Ziffern).
            </p>

            <div className="mb-2 plz-input text-center">
              <label className="form-label">PLZ *</label>
              <input
                type="text"
                className="form-control"
                value={plzLieferung}
                onChange={(e) => setPlzLieferung(e.target.value)}
                maxLength={5}
              />
            </div>
            {!isValidPlz && plzLieferung.length > 0 && (
              <p className="small text-danger">
                Bitte gib eine gültige 5-stellige PLZ ein (nur Zahlen).
              </p>
            )}

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-back"
                onClick={() => setStep(2)}
              >
                Zurück
              </button>
              <button
                className="btn"
                style={{ backgroundColor: '#c0392b', color: '#fff' }}
                onClick={() => setStep(4)}
                disabled={!isValidPlz}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 – Abholtermin ODER Adressvorschläge */}
        {step === 4 && pickupType === 'abholung' && (
          <div className="step-card">
            <h2 className="h4 mb-3">Wann dürfen wir abholen?</h2>
            <p className="text-muted mb-3">
              Wähle ein Datum und ein ungefähres Zeitfenster.
            </p>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Datum *</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Zeitfenster *</label>
                <select
                  className="form-select"
                  value={timeWindow}
                  onChange={(e) => setTimeWindow(e.target.value)}
                >
                  <option value="">Bitte wählen</option>
                  <option value="9-12">09:00 – 12:00</option>
                  <option value="12-15">12:00 – 15:00</option>
                  <option value="15-18">15:00 – 18:00</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-back"
                onClick={() => setStep(3)}
              >
                Zurück
              </button>
              <button
                className="btn"
                style={{ backgroundColor: '#c0392b', color: '#fff' }}
                disabled={!date || !timeWindow}
                onClick={() => setStep(5)}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {step === 4 && pickupType === 'lieferung' && (
          <div className="step-card">
            <h2 className="h4 mb-3">Wähle eine Sammelstelle</h2>
            <p className="text-muted mb-3">
              Wir haben drei Adressen im Bereich PLZ-{zipPrefix || '??'} für dich vorbereitet.
            </p>

            <div className="list-group mb-3">
              {adressVorschlaege.map((a, idx) => (
                <label
                  key={idx}
                  className={`list-group-item list-group-item-action ${
                    selectedAddress === a ? 'active' : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    name="addressChoice"
                    value={a}
                    checked={selectedAddress === a}
                    onChange={() => setSelectedAddress(a)}
                  />
                  <span>{a}</span>
                </label>
              ))}
            </div>

            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-back"
                onClick={() => setStep(3)}
              >
                Zurück
              </button>
              <button
                className="btn"
                style={{ backgroundColor: '#c0392b', color: '#fff' }}
                disabled={!selectedAddress}
                onClick={() => setStep(5)}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

{step === 5 && (
  <div className="step-card-final text-center">
    <h2 className="h3 mb-3">Danke für deine Kleiderspende!</h2>
    <p className="text-muted mb-4">
      Deine Registrierung ist bei uns eingegangen. Wir kümmern uns darum, 
      dass deine Spende sicher im Krisengebiet ankommt.
    </p>

    {/* Bild statt roter Card */}
    <div className="thankyou-image-wrapper mb-4">
      <img 
        src={thankyou} 
        alt="Danke" 
        className="final-image"
      />
    </div>

    <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mb-4">
      <a href="#" className="btn btn-outline-dark">
        Vorbereitungsanleitung (PDF)
      </a>
      <a href="#" className="btn btn-outline-dark">
        Kalendereintrag herunterladen
      </a>
    </div>

    <button
    
      className="btn"
      style={{ backgroundColor: '#c0392b', color: '#fff' }}
      onClick={() => {
        setStep(1)
        setSelectedRegion('')
        setPickupType('')
        setSelectedAddress('')
        setAbholAdresse({ street: '', zip: '', city: '' })
        setPlzLieferung('')
        setDate('')
        setTimeWindow('')
      }}
    >
      Neue Spende registrieren
    </button>
  </div>
)}
      </div>
    </div>
  )
}