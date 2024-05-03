import React, { useEffect, useState } from 'react'
import FieldCard from '../component/FieldCard'
import { motion } from "framer-motion"
import axios from "axios"
const Home = () => {
  const [select, setSelect] = useState("")
  const [fields, setFields] = useState([])
  const [sport, setSport] = useState("")
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem('user'))
  const fetchData = async () => {
    const apiUrl = "http://localhost:4000/api/fields";
    setLoading(true)
    const response = await axios.get(`${apiUrl}`);
    setLoading(false)
    setFields(response.data);
    console.log(response.data)
  };
  const handleClick = (div) => {
    setSelect(select == div ? "" : div)
    setSport(select == div ? "" : div)

    console.log(div)

  }
  useEffect(() => {
    fetchData();

  }, [])
  return (
    <div>
      {/* <SlidShow/> */}
      <div className='hero'>
        <div className='welcome'>
          <h2>Welcome {user?user.name:""},in our</h2>
          <h2>Sport <span className='secCol'>Activites</span> Complex</h2>
          <h2>In University of jordan</h2>
          <button>Book Now!</button>
        </div>
        <div className='heroImage'>
          <img src="./assets/two.png" alt="" />
        </div>
      </div>
      <div className="filterbox">
        <div className="sport" onClick={() => handleClick("Basketball")}>
          <img src="./assets/basketball2.png" alt="" />
          {"Basketball" === select ? (
            <motion.div className="circle" layoutId="circleId" />
          ) : null}
        </div>
        <div className="sport" onClick={() => handleClick("Football")}>
          <img src="./assets/football.png" alt="" />
          {"Football" === select ? (
            <motion.div className="circle" layoutId="circleId" />
          ) : null}
        </div>
        <div className="sport" onClick={() => handleClick("Reesha")}>
          <img src="./assets/reesha.png" alt="" />
          {"Reesha" === select ? (
            <motion.div className="circle" layoutId="circleId" />
          ) : null}
        </div>
        <div className="sport" onClick={() => handleClick("Volleyball")}>
          <img src="./assets/volleyball.png" alt="" />
          {"Volleyball" === select ? (
            <motion.div className="circle" layoutId="circleId" />
          ) : null}
        </div>
        <div className="sport" onClick={() => handleClick("Tennis")}>
          <img src="./assets/tennis.png" alt="" />
          {"Tennis" === select ? (
            <motion.div className="circle" layoutId="circleId" />
          ) : null}
        </div>

      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>) : (
        <div className="fields">
          {
            sport===""?(
              fields.map((field) => <FieldCard key={field._id} name={field.name} description={field.description} imageUrl={field.imageUrl} id={field._id} />)
            ):(
              fields.filter(e=>e.FieldType==sport).map((field) => <FieldCard key={field._id} name={field.name} description={field.description} imageUrl={field.imageUrl} id={field._id} />)
            )
          }
        </div>
      )}


    </div>
  )
}

export default Home