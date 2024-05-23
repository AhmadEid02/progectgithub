import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from '../component/NavBar'
import ScrollToTop from '../component/ScrollToTop'
import Home from './Home'
import Fields from './Fields'
import Football from './Football'
import Basketball from './Basketball'
import Vollyball from './Vollyball'
import AboutUs from './AboutUs'
import News from './News'
import Login from './Login'
import Dashboard from './Dashboard'
import Book from './Book'
import Payment from './Payment'
import Footer from '../component/Footer'

const User = () => {
    const [tog, setTog] = useState(true)
  return (
    <>
      
        
         <NavBar tog={tog}/>
         <ScrollToTop/>
         
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sports" element={<Fields />} />
              <Route path="/sports/football" element={<Football />} />
              <Route path="/sports/basketball" element={<Basketball />} />
              <Route path="/sports/vollyball" element={<Vollyball />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/news" element={<News />} />
              <Route path="/login" element={<Login tog={tog}/>} />
              <Route path="/signup" element={<Login tog={!tog}/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/book/:id" element={<Book />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>

          <Footer/>
        

    </>
  )
}

export default User