import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer.jsx'
import Home from './pages/home.jsx'
import Donate from './pages/donate.jsx'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
import Impressum from './pages/impressum.jsx'
import './App.css'

export default function App() {
  return (
    <>
      <Header />
      <main className="container-fluid mt-4 px-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/impressum" element={<Impressum />} />
        </Routes>
      </main>
    <Footer />
    </>
  )
}