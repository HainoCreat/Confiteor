import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TaskList from './pages/tasks/TaskList'

import Navbar from './components/Navbar'

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<TaskList />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App