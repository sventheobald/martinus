import React, { useState } from 'react'
import { Truck, House } from 'react-bootstrap-icons'
import worldmap from '../images/world.png'
import thankyou from '../images/thankyou.png'

const REGIONS = [
  { id: 'venezuela', label: 'Venezuela', x: '29%', y: '54%' },
  { id: 'gaza', label: 'Gaza', x: '56.8%', y: '44.3%' },
  { id: 'sudan', label: 'Sudan', x: '54%', y: '50%' },
  { id: 'ukraine', label: 'Ukraine', x: '62%', y: '38%' },
  { id: 'afghanistan', label: 'Afghanistan', x: '66%', y: '45%' },
  { id: 'myanmar', label: 'Myanmar', x: '74%', y: '50%' },
]

// einfache „Geschäftsstelle“-PLZ (für Präfix-Check bei Abholung)
const OFFICE_ZIP_PREFIX = '12'

// Kleidungsauswahl (Schritt 2)
const CLOTHING_ITEMS = [
  {
    id: 'jacken',
    label: 'Winterjacken',
    emoji: '🧥',
    description: 'Gefütterte Jacken für kalte Nächte.',
  },
  {
    id: 'pullover',
    label: 'Pullover',
    emoji: '🧶',
    description: 'Warme Oberteile für den Alltag.',
  },
  {
    id: 'hosen',
    label: 'Hosen',
    emoji: '👖',
    description: 'Lange Hosen für Kälte und Wind.',
  },
  {
    id: 'schuhe',
    label: 'Schuhe',
    emoji: '👟',
    description: 'Feste Schuhe für draußen.',
  },
  {
    id: 'kinder',
    label: 'Kinderkleidung',
    emoji: '🧒',
    description: 'Kleidung für Kinder & Babys.',
  },
  {
    id: 'decken',
    label: 'Decken',
    emoji: '🛏️',
    description: 'Decken und Schlafsäcke.',
  },
]

function getSuggestedAddresses(zipPrefix) {
  const p = zipPrefix || '12'
  return [
    `${p}345 – Kleiderkammer Waldheim, Goetheweg 12a`,
    `${p}678 – Sozialzentrum Berghausen, Eschenallee 5`,
    `${p}901 – Notlager Burgstadt-Ost, Burgenstraße 40`,
  ]
}

export default function Donate() {
  const [step, setStep] = useState(1)

  const [selectedRegion, setSelectedRegion] = useState('')

  // Kleidungsauswahl
  const [clothing, setClothing] = useState({
    jacken: 0,
    pullover: 0,
    hosen: 0,
    schuhe: 0,
    kinder: 0,
    decken: 0,
  })
  const [clothingError, setClothingError] = useState('')

  // Übergabe
  const [pickupType, setPickupType] = useState('') // 'abholung' | 'lieferung'

  // Adresse Abholung
  const [abholAdresse, setAbholAdresse] = useState({
    street: '',
    houseNumber: '',
    zip: '',
    city: '',
  })
  const [errors, setErrors] = useState({
    street: '',
    houseNumber: '',
    zip: '',
    city: '',
  })

  // Lieferung-PLZ
  const [plzLieferung, setPlzLieferung] = useState('')
  const [selectedAddress, setSelectedAddress] = useState('')

  // Termin
  const [date, setDate] = useState('')
  const [dateError, setDateError] = useState('')
  const [timeWindow, setTimeWindow] = useState('')

  const totalSteps = 6

  const zipPrefix = plzLieferung.slice(0, 2)
  const adressVorschlaege = getSuggestedAddresses(zipPrefix || '12')

  const isValidPlz =
    plzLieferung.length === 5 && /^[0-9]+$/.test(plzLieferung)

  // Kleidung +/–
  const handleClothingChange = (id, delta) => {
    setClothing(prev => {
      const nextVal = Math.max(0, (prev[id] || 0) + delta)
      return { ...prev, [id]: nextVal }
    })
  }

  const hasClothingSelection = Object.values(clothing).some(v => v > 0)

  // Validierung Abholadresse
  const validatePickupAddress = () => {
    const { street, houseNumber, zip, city } = abholAdresse
    const newErrors = { street: '', houseNumber: '', zip: '', city: '' }
    let hasError = false

    if (!street.trim()) {
      newErrors.street = 'Bitte Straße angeben.'
      hasError = true
    }

    if (!houseNumber.trim()) {
      newErrors.houseNumber = 'Bitte Hausnummer angeben.'
      hasError = true
    } else if (!/^\d+[a-zA-Z]?$/.test(houseNumber.trim())) {
      newErrors.houseNumber = 'Hausnummer bitte als Zahl (optional mit Buchstabe).'
      hasError = true
    }

    if (!zip.trim()) {
      newErrors.zip = 'Bitte PLZ angeben.'
      hasError = true
    } else if (!/^\d{5}$/.test(zip)) {
      newErrors.zip = 'Bitte eine gültige 5-stellige PLZ eingeben.'
      hasError = true
    } else if (zip.slice(0, 2) !== OFFICE_ZIP_PREFIX) {
      newErrors.zip = `Die PLZ sollte mit ${OFFICE_ZIP_PREFIX} beginnen (Nähe unserer Geschäftsstelle).`
      hasError = true
    }

    if (!city.trim()) {
      newErrors.city = 'Bitte Ort angeben.'
      hasError = true
    }

    setErrors(newErrors)
    return !hasError
  }

  // Validierung Datum (nicht in der Vergangenheit)
  const validateDate = () => {
    if (!date) {
      setDateError('Bitte ein Datum wählen.')
      return false
    }
    const selected = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selected < today) {
      setDateError('Das Datum darf nicht in der Vergangenheit liegen.')
      return false
    }

    setDateError('')
    return true
  }

  // Reset für neue Spende
  const resetForm = () => {
    setStep(1)
    setSelectedRegion('')
    setClothing({
      jacken: 0,
      pullover: 0,
      hosen: 0,
      schuhe: 0,
      kinder: 0,
      decken: 0,
    })
    setClothingError('')
    setPickupType('')
    setAbholAdresse({ street: '', houseNumber: '', zip: '', city: '' })
    setErrors({ street: '', houseNumber: '', zip: '', city: '' })
    setPlzLieferung('')
    setSelectedAddress('')
    setDate('')
    setDateError('')
    setTimeWindow('')
  }

  return (
    <div className="donate-page">
      <div className="container py-5">

        {/* Fortschrittsbalken */}
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

        {/* STEP 1 – Krisengebiet */}
        {step === 1 && (
          <div className="card shadow-lg border-0 p-3 pt-2 map-card mt-n4">
            <h2 className="h4 text-center mb-2">
              Welches Krisengebiet möchtest du unterstützen?
            </h2>
            <p className="text-center text-muted mb-2">
              Tippe auf einen Punkt auf der Karte, um ein Krisengebiet zu wählen.
            </p>

            <div className="position-relative map-wrapper">
              <img src={worldmap} alt="Weltkarte" className="img-fluid world-map" />

              {REGIONS.map(r => (
                <button
                  key={r.id}
                  type="button"
                  className={`map-dot ${selectedRegion === r.id ? 'active' : ''}`}
                  style={{ left: r.x, top: r.y }}
                  onClick={() => setSelectedRegion(r.id)}
                />
              ))}

              {selectedRegion && (
                <div className="map-label">
                  {REGIONS.find(r => r.id === selectedRegion)?.label}
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

        {/* STEP 2 – Kleidungsauswahl */}
        {step === 2 && (
          <div className="step-card">
            <h2 className="h4 text-center mb-3">Was möchtest du spenden?</h2>
            <p className="text-muted text-center mb-4">
              Wähle die ungefähre Anzahl der Kleidungsstücke, damit wir besser planen können.
            </p>

            <div className="row g-3 justify-content-center">
              {CLOTHING_ITEMS.map(item => (
                <div className="col-6 col-md-4" key={item.id}>
                  <div className="select-card clothing-card h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="display-6 mb-2">{item.emoji}</div>
                      <h5 className="mb-1">{item.label}</h5>
                      <p className="small text-muted mb-3">{item.description}</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleClothingChange(item.id, -1)}
                      >
                        –
                      </button>
                      <span style={{ minWidth: '2rem', fontWeight: '600' }}>
                        {clothing[item.id]}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleClothingChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {clothingError && (
              <p className="text-danger text-center mt-3">{clothingError}</p>
            )}

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-back"
                onClick={() => setStep(1)}
              >
                Zurück
              </button>
              <button
                className="btn"
                style={{ backgroundColor: '#c0392b', color: '#fff' }}
                onClick={() => {
                  if (!hasClothingSelection) {
                    setClothingError('Bitte wähle mindestens ein Kleidungsstück aus.')
                    return
                  }
                  setClothingError('')
                  setStep(3)
                }}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 – Abholung oder Lieferung */}
        {step === 3 && (
          <div className="step-card">
            <h2 className="h4 text-center mb-4">
              Wie möchtest du deine Spende übergeben?
            </h2>
            <div className="row g-4 justify-content-center">
              <div className="col-md-5">
                <div
                  className={`select-card ${
                    pickupType === 'abholung' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setPickupType('abholung')
                    setStep(4)
                  }}
                >
                  <Truck size={50} className="mb-3" />
                  <h5>Abholung bei mir</h5>
                  <p className="small text-muted">
                    Wir holen die Kleiderspende bei dir zu Hause ab.
                  </p>
                </div>
              </div>

              <div className="col-md-5">
                <div
                  className={`select-card ${
                    pickupType === 'lieferung' ? 'active' : ''
                  }`}
                  onClick={() => {
                    setPickupType('lieferung')
                    setStep(4)
                  }}
                >
                  <House size={50} className="mb-3" />
                  <h5>Ich liefere selbst</h5>
                  <p className="small text-muted">
                    Du gibst deine Spende bei unseren Abgabestellen ab.
                  </p>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-back"
                onClick={() => setStep(2)}
              >
                Zurück
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 – Abholadresse */}
        {step === 4 && pickupType === 'abholung' && (
          <div className="step-card">
            <h2 className="h4 mb-3 text-center">Wo sollen wir die Spende abholen?</h2>
            <p className="text-muted text-center mb-4">
              Bitte gib die Abholadresse an. Die PLZ sollte im gleichen Bereich liegen wie unsere Geschäftsstelle.
            </p>

            {/* Straße + Hausnummer in einer Zeile */}
            <div className="row g-3 mb-3">
              <div className="col-md-8">
                <label className="form-label">Straße *</label>
                <input
                  type="text"
                  className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                  placeholder="Musterstraße"
                  value={abholAdresse.street}
                  onChange={e => {
                    setAbholAdresse(prev => ({ ...prev, street: e.target.value }))
                    setErrors(prev => ({ ...prev, street: '' }))
                  }}
                />
                {errors.street && (
                  <div className="invalid-feedback">{errors.street}</div>
                )}
              </div>
              <div className="col-md-4">
                <label className="form-label">Hausnummer *</label>
                <input
                  type="text"
                  className={`form-control ${errors.houseNumber ? 'is-invalid' : ''}`}
                  placeholder="12a"
                  value={abholAdresse.houseNumber}
                  onChange={e => {
                    setAbholAdresse(prev => ({ ...prev, houseNumber: e.target.value }))
                    setErrors(prev => ({ ...prev, houseNumber: '' }))
                  }}
                />
                {errors.houseNumber && (
                  <div className="invalid-feedback">{errors.houseNumber}</div>
                )}
              </div>
            </div>

            {/* PLZ + Ort */}
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">PLZ *</label>
                <input
                  type="text"
                  className={`form-control address-zip ${errors.zip ? 'is-invalid' : ''}`}
                  placeholder="12345"
                  value={abholAdresse.zip}
                  maxLength={5}
                  onChange={e => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 5)
                    setAbholAdresse(prev => ({ ...prev, zip: value }))
                    setErrors(prev => ({ ...prev, zip: '' }))
                  }}
                />
                {errors.zip && (
                  <div className="invalid-feedback">{errors.zip}</div>
                )}
              </div>
              <div className="col-md-8">
                <label className="form-label">Ort *</label>
                <input
                  type="text"
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  placeholder="Musterstadt"
                  value={abholAdresse.city}
                  onChange={e => {
                    setAbholAdresse(prev => ({ ...prev, city: e.target.value }))
                    setErrors(prev => ({ ...prev, city: '' }))
                  }}
                />
                {errors.city && (
                  <div className="invalid-feedback">{errors.city}</div>
                )}
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
                onClick={() => {
                  if (validatePickupAddress()) {
                    setStep(5)
                  }
                }}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 – Lieferung PLZ */}
        {step === 4 && pickupType === 'lieferung' && (
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
                onChange={e =>
                  setPlzLieferung(e.target.value.replace(/\D/g, '').slice(0, 5))
                }
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
                onClick={() => setStep(3)}
              >
                Zurück
              </button>
              <button
                className="btn"
                style={{ backgroundColor: '#c0392b', color: '#fff' }}
                onClick={() => setStep(5)}
                disabled={!isValidPlz}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 – Abholtermin */}
        {step === 5 && pickupType === 'abholung' && (
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
                  className={`form-control ${dateError ? 'is-invalid' : ''}`}
                  value={date}
                  onChange={e => {
                    setDate(e.target.value)
                    setDateError('')
                  }}
                />
                {dateError && (
                  <div className="invalid-feedback">{dateError}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Zeitfenster *</label>
                <select
                  className="form-select"
                  value={timeWindow}
                  onChange={e => setTimeWindow(e.target.value)}
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
                onClick={() => setStep(4)}
              >
                Zurück
              </button>
              <button
                className="btn"
                style={{ backgroundColor: '#c0392b', color: '#fff' }}
                onClick={() => {
                  const ok = validateDate()
                  if (!ok) return
                  if (!timeWindow) return
                  setStep(6)
                }}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 – Sammelstelle wählen */}
        {step === 5 && pickupType === 'lieferung' && (
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
                onClick={() => setStep(4)}
              >
                Zurück
              </button>
              <button
                className="btn"
                style={{ backgroundColor: '#c0392b', color: '#fff' }}
                disabled={!selectedAddress}
                onClick={() => setStep(6)}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* STEP 6 – Danke */}
        {step === 6 && (
          <div className="step-card-final text-center">
            <h2 className="h3 mb-3 text-dark">Danke für deine Kleiderspende!</h2>
            <p className="text-muted mb-4">
              Deine Registrierung ist bei uns eingegangen. Wir kümmern uns darum,
              dass deine Spende sicher im Krisengebiet ankommt.
            </p>

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

              
            </div>

            <button
              className="btn"
              style={{ backgroundColor: '#c0392b', color: '#fff' }}
              onClick={resetForm}
            >
              Neue Spende registrieren
            </button>
          </div>
        )}
      </div>
    </div>
  )
}