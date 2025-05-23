import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
// pages
import Layout from './pages/Layout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import TaskPage from './pages/TaskPage.jsx'
import LoginPage from './pages/Login.jsx'
import SignupPage from './pages/Signup.jsx'
import FriendRequestPage from './pages/FriendRequestPage.jsx'
// routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

let isAuthorized = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* route paths combine with the parent */}
        <Route path='/' element={<Layout><LandingPage /></Layout>} />
        <Route path='/dashboard' element={<Layout><Dashboard /></Layout>} />
        <Route path='/tasks' element={<Layout><TaskPage /></Layout>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/friend-request' element={<Layout><FriendRequestPage /></Layout>}></Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
