import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './pages/User'
import Admin from './pages/Admin'
import AdminLogin from './AdminLogin'

function App() {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path='/*' element={<User/>}/>
              {/* <Route path='/admin/*' element={user?<Admin/>:<AdminLogin/>}/> */}
              <Route path='/admin/*' element={<Admin/>}/>
            </Routes>
        </BrowserRouter>

    </>
  )
}

export default App
