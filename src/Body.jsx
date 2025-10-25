import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  return (
    <div>

        <Navbar/>
        <Outlet/> {/* Nested routes (Login/Profile) will appear here */}
        <Footer/>
    </div>
  )
}

export default Body