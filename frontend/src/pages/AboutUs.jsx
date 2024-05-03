import React from 'react'
import {motion}from"framer-motion"
const AboutUs = () => {
  return (
    <div>AboutUs
      <div className='the'>
         <motion.img 
         initial={{
          rotate:"0deg"
         }}
         animate={{
          rotate:"180deg"
         }}
         transition={{
          duration:"1"
         }}
         whileHover={{}}
         className='theboss' src=".\assets\thebossHD.jpeg" alt="" /> 
         <div className='wow'>
          <h3>my name is ali </h3>
          <h3>my word is important,very may I add </h3>
         </div>
      </div>

    </div>
  )
}

export default AboutUs