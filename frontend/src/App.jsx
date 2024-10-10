import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import AdvertisementsPage from './pages/AdvertisementsPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/advertisements" element={<AdvertisementsPage />} />

      </Routes>
    </BrowserRouter>
  )
}
