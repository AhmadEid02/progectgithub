import React from 'react'
import './fields.css'
import { useNavigate } from 'react-router-dom'

const Fields = () => {
    const navigate = useNavigate();
    const navigateTo=(path)=>{
        navigate(`/sports/${path}`)
    }
    return (
        <div>
    
            <div className='Services'>
                <div className='Service' onClick={e=>navigateTo("football")}>
                    <img src="./assets/Football11field.jpeg" alt="" />
                    <div className='desc'>
                        <h2>Football</h2>
                        <p>Experience the thrill of football at the University of Jordan. Our state-of-the-art football fields provide the perfect setting for matches, training sessions, and friendly games. Explore our fields, stay updated on upcoming matches, celebrate our team's achievements, get the latest news, and meet our dedicated football team.</p>
                    </div>
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                </div>
                <div className='Service r2' onClick={e=>navigateTo("basketball")}>
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                    <img src="./assets/Football5field.jpg" alt="" />
                    <div className='desc'>
                        <h2>Basketball</h2>
                        <p>Discover basketball at the University of Jordan. Our top-notch courts provide an excellent environment for competitive games and practice. Learn about our basketball courts, upcoming matches, team achievements, latest news, and meet our talented basketball team.</p>
                    </div>
                </div>
                <div className='Service' onClick={e=>navigateTo("vollyball")}>
                    <img src="./assets/Volleyballfield.jpeg" alt="" />
                    <div className='desc'>
                        <h2> Volleyball</h2>
                        <p>Join the excitement of volleyball at the University of Jordan. Our professional courts cater to both casual play and competitive matches. Explore our volleyball courts, upcoming matches, team achievements, latest news, and meet our dedicated volleyball team.</p>
                    </div>
                    <span className="material-symbols-outlined">
                        arrow_forward
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Fields