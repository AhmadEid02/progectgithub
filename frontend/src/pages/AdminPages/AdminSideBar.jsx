import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (route) => {
        navigate(`/admin/${route}`);
    };

    const isActive = (route) => {
        return location.pathname.includes(route);
    };

    return (
        <div className='side-bar'>
            <div className='side-bar-head'>
                <span className="material-symbols-outlined">
                    menu
                </span>
                <h5>Admin</h5>
            </div>
            <div className={`side-bar-row ${isActive("field") ? "active" : ""}`} onClick={() => handleNavigate("field")}>
                <img src="../../../assets/football-field.png" alt="" />
                <p>Fields</p>
            </div>
            <div className={`side-bar-row ${isActive("book") ? "active" : ""}`} onClick={() => handleNavigate("book")}>
                <img src="../../../assets/booking.png" alt="" />
                <p>Books</p>
            </div>
            <div className={`side-bar-row ${isActive("news") ? "active" : ""}`} onClick={() => handleNavigate("news")}>
                <span className="material-symbols-outlined">
                    feed
                </span>
                <p>News</p>
            </div>
            <div className={`side-bar-row ${isActive("matches") ? "active" : ""}`} onClick={() => handleNavigate("matches")}>
                <img src="../../../assets/football-players.png" alt="" />
                <p>Matches</p>
            </div>
            <div className="side-bar-footer">
                <img src="../../../assets/defaultUser.jpg" alt="" />
                <p>admin</p>
            </div>
        </div>
    );
};

export default AdminSideBar;
