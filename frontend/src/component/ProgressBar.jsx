import { motion,useScroll } from 'framer-motion'
import React from 'react'

const ProgressBar = () => {
    const {scrollYProgress}=useScroll();
  return (
    <motion.div className='ProgressBar' style={{scaleX:scrollYProgress}}>
    </motion.div>
  )
}

export default ProgressBar