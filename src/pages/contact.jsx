import contactImg from "../images/contact.png";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="container py-5">

        <h1 className="text-center mb-4 text-white">
          Kontakt
        </h1>

        <p className="text-center text-light mb-5">
          Wir freuen uns auf deine Nachricht.
        </p>

        {/* Haupt-Contact-Card */}
        <div className="contact-card p-4 p-md-5">

          <div className="row g-4 align-items-start">

            {/* 🔵 LINKER BLOCK (Bild + Infos) */}
            <div className="col-md-4 text-center text-md-start">

              {/* Bild */}
              <img 
                src={contactImg}
                alt="Kontakt"
                className="contact-image mb-3"
              />

              {/* Infos */}
            

              <p className="text-light mb-2">
                📧 <strong>Email:</strong> spenden@martinus.de
              </p>

              <p className="text-light mb-2">
                ☎️ <strong>Telefon:</strong> 0761 / 32 16 8
              </p>

              <p className="text-light mb-4">
                📍 <strong>Adresse:</strong><br />
                Waldstraße 12, 79104 Freiburg
              </p>

              <h6 className="text-white mt-4">Öffnungszeiten</h6>
              <p className="text-light small mb-1">Mo–Fr: 10:00–17:00 Uhr</p>
              <p className="text-light small">Sa: 10:00–13:00 Uhr</p>

            </div>

            {/* 🔴 RECHTS (Formular) */}
            <div className="col-md-8">
              <form>
                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label text-white">Vorname *</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-white">Nachname *</label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label text-white">E-Mail *</label>
                    <input type="email" className="form-control" />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label text-white">Nachricht *</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Wie können wir dir helfen?"
                    ></textarea>
                  </div>

                </div>

                <button
                  className="btn mt-4"
                  style={{ backgroundColor: '#c0392b', color: '#fff' }}
                >
                  Nachricht senden
                </button>

              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}