import React, { useState } from 'react'
import { motion } from "framer-motion"

const FieldCard = ({name,description,id,imageUrl}) => {
    const [open, setOpen] = useState(false)
    return (
        <>
        <div className="field" id={id}>
                            <img src={`./assets/${imageUrl}`} alt="" />
                            <h3>{name}</h3>
                            <p>{description}</p>
                            <button onClick={() => (setOpen(!open))}>Book now!</button>
                        </div>
            {
                open && (
                    <>
                        <div className="overlay"></div>
                        <motion.div 
                        // animate={{
                        //     rotate:"360deg"
                        // }}
                        className="field open" id={id}>
                            <div className='card2ndone'>
                                <img src={`./assets/${imageUrl}`} alt="" />
                                <div className='card2ndtwo'>
                                    <h4>{`${name}`}</h4>
                                    <p>{description}</p>
                                    <select name="time" id="fieldTime">
                                        <option value="10:10">10:10</option>
                                        <option value="11:10">11:10</option>
                                        <option value="12:10">12:10</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={() => (setOpen(!open))}>Book now!</button>
                        </motion.div>
                    </>

                )
            }


        </>
    )
}

export default FieldCard