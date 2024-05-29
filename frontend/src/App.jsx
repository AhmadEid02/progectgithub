import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './pages/User'
import Admin from './pages/Admin'
import AdminLogin from './AdminLogin'

function App() {
  const admin = JSON.parse(localStorage.getItem('admin'))
  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path='/*' element={<User/>}/>
              <Route path='/admin/*' element={admin?<Admin/>:<AdminLogin/>}/>
              {/* <Route path='/admin/*' element={<Admin/>}/> */}
            </Routes>
        </BrowserRouter>

    </>
  )
}

export default App
