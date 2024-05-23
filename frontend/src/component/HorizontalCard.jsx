import React from 'react'

const HorizontalCard = ({ id, imageUrl, name, date, time, bookedDuration, upcoming }) => {
  return (
    <div className="field-horizontal" id={id}>
      <img src={`./assets/${imageUrl}`} alt="" />
      <div>
        <h3>{name}</h3>
        {/* <p>description</p> */}
        <p>date: {date}</p>
        <p>time: {time}</p>
        <p>booked Duration: {bookedDuration}</p>
        {
          upcoming ? (<button>Modfiy Book!</button>) :("")
        }
      </div>
    </div>
  )
}

export default HorizontalCard