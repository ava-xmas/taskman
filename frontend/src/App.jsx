import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
// pages
import Layout from './pages/Layout.jsx'
import LandingPage from './pages/LandingPage.jsx'
// routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* route paths combine with the parent */}
        <Route path='/' element={<Layout><LandingPage /></Layout>}>
          <Route index element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
