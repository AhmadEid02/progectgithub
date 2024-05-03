import React, { useEffect, useState } from 'react'
import { motion ,useAnimation,MotionConfig} from "framer-motion"
import imags from './imags'
const SlidShow = () => {
    const [currentIndex1, setCurrentIndex1] = useState(1);
    const [currentIndex2, setCurrentIndex2] = useState(2);
    const [currentIndex3, setCurrentIndex3] = useState(3);
    const control1 =useAnimation()
    const control2 =useAnimation()
    const control3 =useAnimation()
    
    const handleClik=()=>{
        const newIndex = currentIndex1 === 3 ? 1 : currentIndex1 + 1;
        setCurrentIndex1(newIndex);
        control1.start(`idex${currentIndex1}`)

        const newIndex2 = currentIndex2 === 3 ? 1 : currentIndex2 + 1;
        setCurrentIndex2(newIndex2);
        control2.start(`idex${currentIndex2}`)

        const newIndex3 = currentIndex3 === 3 ? 1 : currentIndex3 + 1;
        setCurrentIndex3(newIndex3);
        control3.start(`idex${currentIndex3}`)
    }
    useEffect(() => {
        const interval = setInterval(() => {
            handleClik();
          console.log("hello word")
        }, 5000);
    
        return () => clearInterval(interval);
      }, []);
    
    return (
        <div>
            <MotionConfig transition={{
                ease:'linear'
            }}>
            <motion.div
                
                className='carsousel'>
                {/* <motion.div drag="x" className='inner-carsousel'> */}


                <motion.div 
                variants={{
                    idex1: { x: -100 ,y:100},
                    idex2: {x: 300 ,y:100},
                    idex3: { x: 700 ,y:100}
                }}
                initial={"idex1"} animate={control1}  className='item' layoutId="slider">
                    1
                    <img src={imags[0]} alt="" />
                </motion.div>
                <motion.div 
                variants={{
                    idex1: { x: -100 ,y:100},
                    idex2: {x: 300 ,y:100},
                    idex3: { x: 700 ,y:100},
                }}
                initial={"idex2"} animate={control2} className='item' layoutId="slider">
                    2
                    <img src={imags[1]} alt="" />
                </motion.div>
                <motion.div 
                variants={{
                    idex1: { x: -100 ,y:100},
                    idex2: {x: 300 ,y:100},
                    idex3: { x: 700 ,y:100}
                }}
                initial={"idex3"} animate={control3} className='item' layoutId="slider">
                    3
                    <img src={imags[2]} alt="" />
                </motion.div>


                {/* </motion.div> */}
            </motion.div>
            <div>
                <button onClick={handleClik}>click me</button>
                <button>{">"}</button>
            </div>
            </MotionConfig>
        </div>
    )
}

export default SlidShow