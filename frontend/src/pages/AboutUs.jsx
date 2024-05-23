import React from 'react'
import './Aboutus.css'

const AboutUs = () => {
  return (
    <div>
      <div className="image-contaner">
        <img src="./assets/SportComplex2.jpeg" alt="" />
      </div>
      <div className='about-us'>
        <div className='info'>
          <div>
            <h2>About the Sports Activity Complex</h2>
            <p>Welcome to the Sports Activity Complex at the University of Jordan, a dynamic hub designed to cater to a diverse range of sports and recreational activities for both students and faculty. Here's an insightful glimpse into what our complex has to offer:</p>

          </div>
          <img src="./assets/about.png" alt="" srcset="" />
        </div>
        <ul>
          <li><b>Sports Facilities:</b> The complex likely includes a range of sports facilities such as indoor and outdoor courts for basketball, volleyball, and tennis. It may also have a football (soccer) field and a track for athletics.</li>
          <li><b>Indoor Gym: </b>Expect a well-equipped indoor gym with various exercise machines, free weights, and space for fitness classes. This gym is typically available for students and staff to use for workouts and training.</li>
          <li><b>Recreational Spaces: </b>Apart from organized sports, there may be spaces for recreational activities like table tennis, billiards, or video games.</li>
          <li><b>Fitness Services: </b>Some complexes offer additional services like personal training, fitness assessments, and sports injury treatment or prevention.</li>
        </ul>
        <h2>Our Services Include</h2>
        <div className='our-services'>
          <div className='service-card'>
            <img src="./assets/Trophies.svg" alt="" />
            <p>Trophies</p>
          </div>
          <div className='service-card'>
            <img src="./assets/Stadiums.svg" alt="" />
            <p>Stadiums</p>
          </div>
          <div className='service-card'>
            <img src="./assets/Matches.svg" alt="" />
            <p>Matches</p>
          </div>
          <div className='service-card'>
            <img src="./assets/Referee.svg" alt="" />
            <p>Organizers & Referees</p>
          </div>
        </div>
      </div>
    </div>
      

  )
}

export default AboutUs