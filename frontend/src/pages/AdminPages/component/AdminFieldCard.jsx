import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminFieldCard = ({ field, id }) => {
  const navigate = useNavigate();
  const handleBook = () => {
    navigate(`/admin/field/${field._id}`)
  }
  return (

    <>
      <div className="field" key={id}>
        <img src={`../../assets/fields/${field.imageUrl}`} alt="" />
        <h3>{field.name}</h3>
        <p>{field.description}</p>
        <button onClick={handleBook}>More info!</button>
      </div>


    </>

  )
}

export default AdminFieldCard