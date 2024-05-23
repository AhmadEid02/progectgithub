import React from 'react'

const Footer = () => {
  return (
    <>
    <div className="about-section contact-section">
        <h2>Contact Us</h2>
        <p>Have questions or feedback? Feel free to reach out to us:</p>
        <ul>
            <li>Phone: +1234567890</li>
            <li>Email: <a href="mailto:contact@SportActivitiesCenter.ju">contact@SportActivitiesCenter.ju</a></li>
        </ul>
        <div className="social-media">
            <a href="#" className="social-icon"><img src="../assets/facebook.png" alt="Facebook"/></a>
            <a href="#" className="social-icon"><img src="../assets/tele.png" alt="Telegaram"/></a>
            <a href="#" className="social-icon"><img src="../assets/instagarm.png" alt="Instagram"/></a>
        </div>
        <p>&copy; 2024 Sport Activities Center</p>
    </div>
    </>
  )
}

export default Footer