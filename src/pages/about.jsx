import React from "react";

import ming from "../images/team1.png";
import amira from "../images/team2.png";
import cara from "../images/team3.png";
import max from "../images/team4.png";


export default function AboutUs() {
  const TEAM = [
    {
      name: "Max",
      role: "Koordination & Logistik",
      text: "Max sorgt dafür, dass jede Kleiderspende zur richtigen Zeit am richtigen Ort landet.",
      img: max,
    },
    {
      name: "Amira",
      role: "Humanitäre Projekte",
      text: "Amira arbeitet eng mit Hilfsorganisationen vor Ort zusammen und stellt sicher, dass die Spenden bedarfsgerecht verteilt werden.",
      img: amira,
    },
    {
      name: "Ming",
      role: "IT & Digitalstrategie",
      text: "Ming entwickelt digitale Tools, die unsere Abläufe schnell und effizient machen.",
      img: ming,
    },
    {
      name: "Cara",
      role: "Kommunikation & Spendenbetreuung",
      text: "Cara sorgt für transparente Kommunikation und begleitet Hilfsaktionen.",
      img: cara,
    },
  ];

  return (
    <div className="about-page">
      {/* Banner oben */}
      <div className="about-hero"></div>

      <div className="container pb-5">
        <h2 className="text-center text-white mb-5">
          Gemeinsam helfen wir dort, wo wir am meisten gebraucht werden.
        </h2>

        {TEAM.map((p, index) => (
          <div className="team-card row align-items-center mx-auto mb-5 p-4" key={index}>
            
            {/* Bild links */}
            <div className="col-md-4 text-center mb-3 mb-md-0">
              <img src={p.img} alt={p.name} className="team-photo" />
            </div>

            {/* Text rechts */}
            <div className="col-md-8">
              <h3 className="team-name">{p.name}</h3>
              <h5 className="team-role">{p.role}</h5>
              <p className="team-text">{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}