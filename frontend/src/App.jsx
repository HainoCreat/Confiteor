import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TaskList from './pages/tasks/TaskList'
import TaskDetail from './pages/tasks/TaskDetail'
import TaskCreate from './pages/tasks/TaskCreate'
import TaskEdit from './pages/tasks/TaskEdit'
import About from './pages/info/About'

import Navbar from './components/Navbar'

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/tasks/create" element={<TaskCreate/>} />
      <Route path="/tasks/:id/edit" element={<TaskEdit/>} />
      <Route path="/tasks/:id" element={<TaskDetail />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App