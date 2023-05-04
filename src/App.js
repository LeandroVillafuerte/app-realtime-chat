import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/setAvatar' element={<SetAvatar/>}/>
        <Route path='/' element={<Chat/>}/>
        <Route path="*" element={<div>Not Found</div>}/>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App