import React, { useState } from 'react'
import { Truck, House } from 'react-bootstrap-icons';
import worldmap from '../images/world.png'
import thankyou from '../images/thankyou.png'


// Geschäftsstelle (79*)
const OFFICE_ZIP_PREFIX = '79'

// Standard Abgabeadresse
const LIEFERUNGS_ADRESSE = {
  street: 'Waldstraße',
  houseNumber: '12',
  zip: '79104',
  city: 'Freiburg',
}

const REGIONS = [
  { id: 'venezuela', label: 'Venezuela', x: '29%', y: '54%' },
  { id: 'gaza', label: 'Gaza', x: '56.8%', y: '44.3%' },
  { id: 'sudan', label: 'Sudan', x: '54%', y: '50%' },
  { id: 'ukraine', label: 'Ukraine', x: '62%', y: '38%' },
  { id: 'afghanistan', label: 'Afghanistan', x: '66%', y: '45%' },
  { id: 'myanmar', label: 'Myanmar', x: '74%', y: '50%' },
]

// Kleidungsauswahl für Schritt 2
const CLOTHING_ITEMS = [
  { id: 'jacken', label: 'Winterjacken', description: 'Gefütterte Jacken für kalte Nächte.' },
  { id: 'pullover', label: 'Pullover', description: 'Warme Oberteile für den Alltag.' },
  { id: 'hosen', label: 'Hosen', description: 'Lange Hosen für Kälte und Wind.' },
  { id: 'schuhe', label: 'Schuhe', description: 'Feste Schuhe für draußen.' },
  { id: 'kinder', label: 'Kinderkleidung', description: 'Kleidung für Kinder & Babys.' },
  { id: 'decken', label: 'Decken', description: 'Decken und Schlafsäcke.' },
]

const TOTAL_STEPS = 8

export default function Donate() {
  // --- STATE ---
  const [step, setStep] = useState(1)
  const [selectedRegion, setSelectedRegion] = useState('')
  const [clothing, setClothing] = useState({
    jacken: 0,
    pullover: 0,
    hosen: 0,
    schuhe: 0,
    kinder: 0,
    decken: 0,
  })
  const [clothingError, setClothingError] = useState('')
  const [plz, setPlz] = useState('')
  const [pickupType, setPickupType] = useState('') // 'abholung' | 'lieferung'
  const [abholAdresse, setAbholAdresse] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    houseNumber: "",
    zip: "",
    city: ""
  })
  const [errors, setErrors] = useState({
    firstName: "",
  lastName: "",
  phone: "",
  street: "",
  houseNumber: "",
  zip: "",
  city: ""
})

  const [date, setDate] = useState('')
  const [timeWindow, setTimeWindow] = useState('')
  const [dateError, setDateError] = useState('') // aktuell nicht genutzt, kannst du später für Termin-Validierung nehmen

  // --- HELPER ---
  const hasClothing = Object.values(clothing).some(v => v > 0)
  const zipPrefix = plz.slice(0, 2)
  const canPickup = zipPrefix === OFFICE_ZIP_PREFIX

  const handleClothingChange = (id, delta) => {
    setClothing(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }))
  }
  const validateDateNotPast = (dateString) => {
    if (!dateString) return false;
  
    const selected = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    return selected >= today;
  };

  const validateAddress = () => {
    const { firstName, lastName, phone, street, houseNumber, zip, city } = abholAdresse;
    const newErrors = {};
  
    // Vorname
    if (!firstName.trim()) {
      newErrors.firstName = "Bitte Vornamen angeben.";
    } else if (!/^[A-Za-zÄÖÜäöüß\s'-]+$/.test(firstName.trim())) {
      newErrors.firstName = "Vorname enthält unzulässige Zeichen.";
    }
  
    // Nachname
    if (!lastName.trim()) {
      newErrors.lastName = "Bitte Nachnamen angeben.";
    } else if (!/^[A-Za-zÄÖÜäöüß\s'-]+$/.test(lastName.trim())) {
      newErrors.lastName = "Nachname enthält unzulässige Zeichen.";
    }
  
    // Telefon (optional → aber wenn ausgefüllt, prüfen)
    if (phone.trim() && !/^[0-9+\-\s()]{5,20}$/.test(phone.trim())) {
      newErrors.phone = "Bitte eine gültige Telefonnummer eingeben.";
    }
  
    // Straße
    if (!street.trim()) {
      newErrors.street = "Bitte Straße angeben.";
    }
  
    // Hausnummer
    if (!houseNumber.trim()) {
      newErrors.houseNumber = "Bitte Hausnummer angeben.";
    } else if (!/^\d+[a-zA-Z]?$/.test(houseNumber.trim())) {
      newErrors.houseNumber = "Hausnummer bitte z. B. 12 oder 12a eingeben.";
    }
  
    // PLZ
    if (!/^\d{5}$/.test(zip)) {
      newErrors.zip = "Bitte eine gültige 5-stellige PLZ eingeben.";
    } else if (zip.slice(0, 2) !== OFFICE_ZIP_PREFIX) {
      newErrors.zip = `Die PLZ muss mit ${OFFICE_ZIP_PREFIX} beginnen.`;
    }
  
    // Stadt
    if (!city.trim()) {
      newErrors.city = "Bitte Ort angeben.";
    } else if (!/^[A-Za-zÄÖÜäöüß\s'-]+$/.test(city.trim())) {
      newErrors.city = "Der Ortsname darf nur Buchstaben, Bindestrich oder Leerzeichen enthalten.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setStep(1)
    setSelectedRegion('')
    setClothing({ jacken: 0, pullover: 0, hosen: 0, schuhe: 0, kinder: 0, decken: 0 })
    setClothingError('')
    setPlz('')
    setPickupType('')
    setAbholAdresse({ street: '', houseNumber: '', zip: '', city: '' })
    setErrors({})
    setDate('')
    setTimeWindow('')
    setDateError('')
  }

  const formatGermanDate = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    return d.toLocaleDateString("de-DE");
  };
  // --- RENDER ---
  return (
    <div className="donate-page">
      <div className="container py-5">
        {/* Fortschrittsanzeige */}
        <div className="step-header mb-4">
          <div className="progress" style={{ height: '8px' }}>
            <div
              className="progress-bar bg-danger"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            ></div>
          </div>
          <p className="text-center mt-2 text-muted">
            Schritt {step} von {TOTAL_STEPS}
          </p>
        </div>

        {/* -------------------------------- STEP 1 -------------------------------- */}
        {step === 1 && (
          <div className="card p-3 map-card">
            <h2 className="h4 text-center mb-2">
              Welches Krisengebiet möchtest du unterstützen?
            </h2>
            <p className="text-center text-muted mb-3">
              Tippe auf einen Punkt auf der Karte.
            </p>

            <div className="position-relative map-wrapper">
              <img src={worldmap} className="img-fluid world-map" alt="Weltkarte" />

              {REGIONS.map(r => (
                <button
                  key={r.id}
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
                className="btn btn-danger"
                disabled={!selectedRegion}
                onClick={() => setStep(2)}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* -------------------------------- STEP 2 -------------------------------- */}
        {step === 2 && (
          <div className="step-card">
            <h2 className="h4 text-center mb-3">Was möchtest du spenden?</h2>

            <div className="row g-3 justify-content-center">
              {CLOTHING_ITEMS.map(item => (
                <div className="col-6 col-md-4" key={item.id}>
                  <div className="select-card clothing-card h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="display-6 mb-2">{item.emoji}</div>
                      <h5>{item.label}</h5>
                      <p className="small text-muted">{item.description}</p>
                    </div>

                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleClothingChange(item.id, -1)}
                      >
                        –
                      </button>
                      <span style={{ minWidth: '2rem' }}>{clothing[item.id]}</span>
                      <button
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
              <p className="text-danger text-center mt-2">{clothingError}</p>
            )}

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-back" onClick={() => setStep(1)}>
                Zurück
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (!hasClothing) {
                    return setClothingError(
                      'Bitte wähle mindestens ein Kleidungsstück.'
                    )
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

        {/* -------------------------------- STEP 3 (PLZ) -------------------------------- */}
        {step === 3 && (
          <div className="step-card">
            <h2 className="h4 text-center mb-3">Wo befindest du dich?</h2>

            <div className="plz-input text-center mb-3">
              <label className="form-label">Postleitzahl *</label>
              <input
                className="form-control"
                value={plz}
                maxLength={5}
                onChange={e =>
                  setPlz(e.target.value.replace(/\D/g, '').slice(0, 5))
                }
              />
            </div>

            {!/^\d{5}$/.test(plz) && plz.length > 0 && (
              <p className="text-danger small text-center">
                Bitte gültige PLZ eingeben.
              </p>
            )}

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-back" onClick={() => setStep(2)}>
                Zurück
              </button>
              <button
                className="btn btn-danger"
                disabled={!/^\d{5}$/.test(plz)}
                onClick={() => setStep(4)}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* -------------------------------- STEP 4 (Übergabeart) -------------------------------- */}
        {step === 4 && (
          <div className="step-card">
            <h2 className="h4 text-center mb-4">
              Wie möchtest du deine Spende übergeben?
            </h2>

            <div className="row g-4 justify-content-center">
              {canPickup && (
                <div className="col-md-5">
                  <div
                    className="select-card"
                    onClick={() => {
                      setPickupType('abholung')
                      setAbholAdresse(prev => ({ ...prev, zip: plz }))
                      setStep(5)
                    }}
                  >
                    <Truck size={50} className="mb-3" />
                    <h5>Abholung bei mir</h5>
                    <p className="small text-muted">
                      Wir holen die Spende bei dir zu Hause ab.
                    </p>
                  </div>
                </div>
              )}

              <div className="col-md-5">
                <div
                  className="select-card"
                  onClick={() => {
                    setPickupType('lieferung')
                    setStep(6) // direkt zur Übersicht
                  }}
                >
                  <House size={50} className="mb-3" />
                  <h5>Ich liefere selbst</h5>
                  <p className="small text-muted">
                    Du gibst deine Spende direkt bei uns ab.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-muted mt-3">
              {canPickup
                ? 'Abholung und Lieferung möglich.'
                : 'In deinem Gebiet bieten wir nur Lieferung an.'}
            </p>

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-back" onClick={() => setStep(3)}>
                Zurück
              </button>
            </div>
          </div>
        )}

        {/* -------------------------------- STEP 5 (Abholadresse) -------------------------------- */}
        {step === 5 && pickupType === 'abholung' && (
          <div className="step-card">
            <h2 className="h4 mb-3 text-center">
              Wo sollen wir die Spende abholen?
            </h2>
{/* Vor- & Nachname */}
<div className="row g-3 mb-3">
  <div className="col-md-6">
    <label className="form-label">Vorname *</label>
    <input 
      className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
      value={abholAdresse.firstName}
      onChange={e => {
        setAbholAdresse(prev => ({...prev, firstName: e.target.value}));
        setErrors(prev => ({...prev, firstName: ""}));
      }}
    />
    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
  </div>

  <div className="col-md-6">
    <label className="form-label">Nachname *</label>
    <input 
      className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
      value={abholAdresse.lastName}
      onChange={e => {
        setAbholAdresse(prev => ({...prev, lastName: e.target.value}));
        setErrors(prev => ({...prev, lastName: ""}));
      }}
    />
    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
  </div>
</div>

{/* Optional: Telefon */}
<div className="mb-3">
  <label className="form-label">Telefon (optional)</label>
  <input 
    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
    value={abholAdresse.phone}
    onChange={e => {
      setAbholAdresse(prev => ({...prev, phone: e.target.value}));
      setErrors(prev => ({...prev, phone: ""}));
    }}
    placeholder="+49 176 12345678"
  />
  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
</div>

            <div className="row g-3 mb-3">
              <div className="col-md-8">
                <label className="form-label">Straße *</label>
                <input
                  className={`form-control ${
                    errors.street ? 'is-invalid' : ''
                  }`}
                  value={abholAdresse.street}
                  onChange={e => {
                    setAbholAdresse(prev => ({
                      ...prev,
                      street: e.target.value,
                    }))
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
                  className={`form-control ${
                    errors.houseNumber ? 'is-invalid' : ''
                  }`}
                  value={abholAdresse.houseNumber}
                  onChange={e => {
                    setAbholAdresse(prev => ({
                      ...prev,
                      houseNumber: e.target.value,
                    }))
                    setErrors(prev => ({ ...prev, houseNumber: '' }))
                  }}
                />
                {errors.houseNumber && (
                  <div className="invalid-feedback">{errors.houseNumber}</div>
                )}
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">PLZ *</label>
                <input
                  className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
                  maxLength={5}
                  value={abholAdresse.zip}
                  onChange={e =>
                    setAbholAdresse(prev => ({
                      ...prev,
                      zip: e.target.value.replace(/\D/g, '').slice(0, 5),
                    }))
                  }
                />
                {errors.zip && (
                  <div className="invalid-feedback">{errors.zip}</div>
                )}
              </div>

              <div className="col-md-8">
                <label className="form-label">Ort *</label>
                <input
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  value={abholAdresse.city}
                  onChange={e => {
                    setAbholAdresse(prev => ({
                      ...prev,
                      city: e.target.value,
                    }))
                    setErrors(prev => ({ ...prev, city: '' }))
                  }}
                />
                {errors.city && (
                  <div className="invalid-feedback">{errors.city}</div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-back" onClick={() => setStep(4)}>
                Zurück
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (validateAddress()) setStep(6)
                }}
              >
                Weiter
              </button>
            </div>
          </div>
        )}


{step === 6 && pickupType === "abholung" && (
  <div className="step-card">
    <h2 className="h4 mb-3 text-center">Wann dürfen wir abholen?</h2>
    <p className="text-muted text-center mb-3">
      Bitte wähle ein Datum und ein Zeitfenster.
    </p>

    <div className="row g-3">
      {/* Datum */}
      <div className="col-md-6">
        <label className="form-label">Datum *</label>
        <input
          type="date"
          className={`form-control ${date && !validateDateNotPast(date) ? "is-invalid" : ""}`}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {date && !validateDateNotPast(date) && (
          <div className="invalid-feedback">
            Bitte ein Datum in der Zukunft auswählen.
          </div>
        )}
      </div>

      {/* Zeitfenster */}
      <div className="col-md-6">
        <label className="form-label">Zeitfenster *</label>
        <select
          className="form-select"
          value={timeWindow}
          onChange={(e) => setTimeWindow(e.target.value)}
        >
          <option value="">Bitte wählen</option>
          <option value="9-12">09:00 – 12:00 Uhr</option>
          <option value="12-15">12:00 – 15:00 Uhr</option>
          <option value="15-18">15:00 – 18:00 Uhr</option>
        </select>
      </div>
    </div>

    <div className="d-flex justify-content-between mt-4">
      <button className="btn btn-back" onClick={() => setStep(5)}>
        Zurück
      </button>

      <button
        className="btn btn-danger"
        disabled={
          !date ||
          !timeWindow ||
          !validateDateNotPast(date)
        }
        onClick={() => setStep(7)}
      >
        Weiter
      </button>
    </div>
  </div>
)}

        {/* -------------------------------- STEP 7 – Checkout / Übersicht -------------------------------- */}
        {step === 7 && (
          <div className="checkout-card">
            <h2 className="h4 text-center mb-3">Bitte überprüfe deine Angaben</h2>
            <p className="text-muted text-center mb-4">
              So wird deine Spende verarbeitet.
            </p>

            <div className="summary-box mb-4">
              {/* Kleidung */}
              <h5 className="summary-title underline">Kleidung</h5>
              <ul className="list-unstyled">
                {Object.entries(clothing)
                  .filter(([_, count]) => count > 0)
                  .map(([id, count]) => (
                    <li key={id} className="mb-1">
                      <strong>
                        {CLOTHING_ITEMS.find(i => i.id === id)?.label}:
                      </strong>{' '}
                      {count}
                    </li>
                  ))}
              </ul>

              {/* Krisengebiet */}
              <h5 className="summary-title mt-4 underline">Krisengebiet</h5>
              <p>{REGIONS.find(r => r.id === selectedRegion)?.label}</p>

              {/* Übergabe */}
              <h5 className="summary-title mt-4 underline">Übergabe</h5>

              {pickupType === 'abholung' ? (
                <div>
                  <p>
                    <strong>Art:</strong> Abholung
                  </p>
                  {/* date/time aktuell leer, kannst du noch ergänzen */}
                  {date && (
                    <p><strong>Datum:</strong> {formatGermanDate(date)}</p>
                  )}
                  {timeWindow && (
                    <p>
                      <strong>Zeitfenster:</strong> {timeWindow} Uhr
                    </p>
                  )}
                  <p>
                    <strong>Adresse:</strong>
                    <br />
                    {abholAdresse.street} {abholAdresse.houseNumber}
                    <br />
                    {abholAdresse.zip} {abholAdresse.city}
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    <strong>Art:</strong> Persönliche Abgabe
                  </p>
                  <p>
                    <strong>Ort:</strong>
                    <br />
                    {LIEFERUNGS_ADRESSE.street} {LIEFERUNGS_ADRESSE.houseNumber}
                    , {LIEFERUNGS_ADRESSE.zip} {LIEFERUNGS_ADRESSE.city}
                  </p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-back"
                onClick={() => {
                  if (pickupType === 'abholung') setStep(5)
                  else setStep(4)
                }}
              >
                Zurück
              </button>

              <button
                className="btn"
                style={{ backgroundColor: '#c0392b', color: '#fff' }}
                onClick={() => setStep(8)}
              >
                Spende bestätigen
              </button>
            </div>
          </div>
        )}

        {/* -------------------------------- STEP 8 — DANKE -------------------------------- */}
        {step === 8 && (
          <div className="step-card-final text-center">
            <h2 className="h3 mb-3 text-dark">Danke für deine Kleiderspende!</h2>

            {pickupType === 'lieferung' ? (
              <>
                <p className="text-muted mb-2">
                  Vielen Dank! Du bringst deine Spende zu:
                </p>
                <p className="text-dark fw-bold mb-4">
                  {LIEFERUNGS_ADRESSE.street} {LIEFERUNGS_ADRESSE.houseNumber},{' '}
                  {LIEFERUNGS_ADRESSE.zip} {LIEFERUNGS_ADRESSE.city}
                </p>
              </>
            ) : (
              <>
                <p className="text-muted mb-2">
                  Wir holen die Spende bei dir ab:
                </p>
                <p className="fw-bold text-dark mb-1">
                  {abholAdresse.street} {abholAdresse.houseNumber}
                </p>
                <p className="fw-bold text-dark mb-3">
                  {abholAdresse.zip} {abholAdresse.city}
                </p>
                {(date || timeWindow) && (
                  <p className="text-muted small mb-3">
                    Termin: {date || '–'}{' '}
                    {timeWindow && <>– Zeitfenster: {timeWindow} Uhr</>}
                  </p>
                )}
              </>
            )}

            <img src={thankyou} className="final-image mb-4" alt="Danke" />

            <button className="btn btn-danger" onClick={reset}>
              Neue Spende registrieren
            </button>
          </div>
        )}
      </div>
    </div>
  )
}