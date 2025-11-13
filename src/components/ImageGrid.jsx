import React from 'react'
import img1 from '../images/gaza.png'
import img2 from '../images/ukraine.png'
import img3 from '../images/afghanistan.png'
import img4 from '../images/myanmar.png'
import img5 from '../images/venezuela.png'
import img6 from '../images/syria.png'

function ImageGrid() {
  return (
    <section className="container py-5">
      {/* Oben: 2 große Bilder */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="position-relative overlay-container">
            <img src={img1} alt="Gaza" className="img-fluid rounded shadow-sm overlay-image" />
            <div className="overlay-text">Gaza: Rahel freut sich über neue Windeln</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="position-relative overlay-container">
            <img src={img2} alt="Ukraine" className="img-fluid rounded shadow-sm overlay-image" />
            <div className="overlay-text">Ukraine: Ivan hat Dank des neuen Schals im Winter warm</div>
          </div>
        </div>
      </div>

      {/* Unten: 4 kleinere Bilder */}
      <div className="row">
        <div className="col-6 col-md-3 mb-3">
          <div className="position-relative overlay-container">
            <img src={img3} alt="Afghanistan" className="img-fluid rounded shadow-sm overlay-image" />
            <div className="overlay-text">Malik aus Afghanistan</div>
          </div>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <div className="position-relative overlay-container">
            <img src={img4} alt="Myanmar" className="img-fluid rounded shadow-sm overlay-image" />
            <div className="overlay-text">Anna-Mae aus Myanmar</div>
          </div>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <div className="position-relative overlay-container">
            <img src={img5} alt="Venezuela" className="img-fluid rounded shadow-sm overlay-image" />
            <div className="overlay-text">Carlos aus Venezuela</div>
          </div>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <div className="position-relative overlay-container">
            <img src={img6} alt="Syrien" className="img-fluid rounded shadow-sm overlay-image" />
            <div className="overlay-text">Fatima aus Syrien</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageGrid