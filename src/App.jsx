import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Home from "./pages/Home"
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import MyBooking from './pages/MyBooking'

const App = () => {1
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/my-booking' element={<MyBooking />} />  
      </Routes>
    </>
  )
}

export default App