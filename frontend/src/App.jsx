import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Fields from './pages/Fields'
import AboutUs from './pages/AboutUs'
import News from './pages/News'
import NavBar from './component/NavBar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { useState } from 'react'
import Book from './pages/Book'
import Payment from './pages/Payment'

function App() {
  const [tog, setTog] = useState(true)
  return (
    <>
      
        <BrowserRouter>
         <NavBar tog={tog}/>
         <div className='container'>
          <div className='mainContant'>
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fields" element={<Fields />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/news" element={<News />} />
              <Route path="/login" element={<Login tog={tog}/>} />
              <Route path="/signup" element={<Login tog={!tog}/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/book" element={<Book />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>

          </div>
          </div>
        </BrowserRouter>
      

    </>
  )
}

export default App
