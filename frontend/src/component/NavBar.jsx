import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion"
const NavBar = ({ tog }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(getSelectedPage());
    const logout = () => {
        localStorage.removeItem('user')
        // dispatch logout action
        navigate('/')
        window.location.reload(false);
    }
    const handelDashboard = () => {
        navigate('/dashboard')
        window.location.reload(false);
    }
    const user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        setSelected(getSelectedPage());
    }, [location.pathname]);

    function getSelectedPage() {

        const currentPage = location.pathname.split('/')[1];
        return currentPage || 'home';
    }
    function handleClick(route) {
        navigate(`/${route}`);
        setSelected(route);
    }
    function goHome(route) {
        navigate("/")
        setSelected("home");
    }
    const goTo = (e) => {
        navigate(`/${e}`)
        window.location.reload();
    }
    return (
        <div className='navbar'>
            <div className='section1' onClick={() => goHome()}>
                <div className='logo'><img src=".\assets\SAClogo.png" alt="" /></div>
                <div className='sac'><span className='secCol'>S</span>port <span className='secCol'>A</span>ctivities <span className='secCol'>C</span>enter</div>
            </div>
            <div className='section2'>
                <div className={`iteam`} onClick={() => goHome()}>
                    <p>Home</p>
                    {"home" === selected ? (
                        <motion.div className="underline" layoutId="underline" />
                    ) : null}
                </div>
                <div className={`iteam`} onClick={() => handleClick("fields")}>
                    Services
                    {"fields" === selected ? (
                        <motion.div className="underline" layoutId="underline" />
                    ) : null}
                </div>
                <div className={`iteam`} onClick={() => handleClick("aboutus")}>
                    About Us
                    {"aboutus" === selected ? (
                        <motion.div className="underline" layoutId="underline" />
                    ) : null}
                </div>

            </div>
            {
                user ? (
                    <div className="userinfo">
                        <div className='iteam' onClick={() => handleClick("Dashboard")}>
                            {user.name}
                            {"Dashboard" === selected ? (
                                <motion.div className="underline" layoutId="underline" />
                            ) : null}
                        </div>
                        <div className='iteam' onClick={logout}>
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button className='btn-log ' onClick={() => goTo('login')}>login</button>
                        <button className='btn-log blue' onClick={() => goTo('signup')}>SignUp</button>
                    </div>
                )
            }

        </div >
    )
}

export default NavBar