import React, { useState } from 'react'
import './AdminPages/Admin.css'
import AdminSideBar from './AdminPages/AdminSideBar'
import { Route, Routes, useParams } from 'react-router-dom'
import AdminHome from './AdminPages/AdminHome'
import AdminNews from './AdminPages/AdminNews'
import AdminBooks from './AdminPages/AdminBooks'
import AdminMatches from './AdminPages/AdminMatches'
import AdminFieldDetails from './AdminPages/AdminFieldDetails'
import AdminFieldUpdate from './AdminPages/AdminFieldUpdate'
import AdminFieldCreate from './AdminPages/AdminFieldCreate'
import AdminNewsCreate from './AdminPages/AdminNewsCreate'
import AdminNewsDetails from './AdminPages/AdminNewsDetails'
import AdminNewsUpdate from './AdminPages/AdminNewsUpdate'
import AdminMatchesCreate from './AdminPages/AdminMatchesCreate'
import AdminMatchesEdit from './AdminPages/AdminMatchesEdit'

const Admin = () => {
    
    return (
        <div className='admin-container'>
            <AdminSideBar />
            <div className='admin-content'>
                <Routes>
                    <Route path="/field" element={<AdminHome />} />
                    <Route path="/field/:id" element={<AdminFieldDetails />} />
                    <Route path="/field/:id/edit" element={<AdminFieldUpdate />} />
                    <Route path="/field/create" element={<AdminFieldCreate />} />
                    <Route path="/book" element={<AdminBooks/>} />
                    <Route path="/matches" element={<AdminMatches />} />
                    <Route path="/matches/add" element={<AdminMatchesCreate />} />
                    <Route path="/matches/:id/edit" element={<AdminMatchesEdit />} />
                    <Route path="/news" element={<AdminNews />} />
                    <Route path="/news/add" element={<AdminNewsCreate />} />
                    <Route path="/news/:id" element={<AdminNewsDetails />} />
                    <Route path="/news/:id/edit" element={<AdminNewsUpdate />} />
                </Routes>
            </div>
        </div>
    )
}

export default Admin