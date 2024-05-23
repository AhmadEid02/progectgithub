import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

const FieldCard = ({name,description,id,imageUrl}) => {
    
    const navigate = useNavigate();
    const handleBook=()=>{
        navigate(`/book/${id}`);
        console.log(id)
    }
    return (
        <>
        <div className="field" id={id}>
                            <img src={`./assets/${imageUrl}`} alt="" />
                            <h3>{name}</h3>
                            <p>{description}</p>
                            <button onClick={handleBook}>Book now!</button>
                        </div>


        </>
    )
}

export default FieldCard