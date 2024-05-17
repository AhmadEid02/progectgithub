import React from 'react'

const HorizontalCard = ({ id, name, date, time }) => {
  return (
    <div className="field-horizontal" id={id}>
      <img src={`./assets/Football5field.jpg`} alt="" />
      <div>
        <h3>{name}</h3>
        {/* <p>description</p> */}
        <p>date: {date}</p>
        <p>time: {time}</p>
        <button>Modfiy Book!</button>
      </div>
    </div>
  )
}

export default HorizontalCard