import React, { useEffect, useRef, useState } from 'react'
import FieldCard from '../component/FieldCard'
import { motion } from "framer-motion"
import axios from "axios"
import { useLocation } from 'react-router-dom'
const Home = () => {
  const [select, setSelect] = useState("")
  const [fields, setFields] = useState([])
  const [sport, setSport] = useState("")
  const [loading, setLoading] = useState(true)
  const fieldsSectionRef = useRef(null);
  const location = useLocation();
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
  // useEffect(() => {
  //   fetchData();

  // }, [])
  useEffect(() => {
    fetchData();

    if (location.state && location.state.sport) {
      setSelect(location.state.sport);
      setSport(location.state.sport);
      fieldsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);
  const handleBookNow=()=>{
    fieldsSectionRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }
  return (
    <div>
      <div className='home-container'>
          <div className='mainContant'>
      
      <div className='hero'>
        <div className='welcome'>
          <h2>Welcome {user?user.name:""},in our</h2>
          <h2>Sport <span className='secCol'>Activites</span> Complex</h2>
          <h2>In University of jordan</h2>
          <button onClick={handleBookNow}>Book Now!</button>
        </div>
        <div className='heroImage'>
          <img src="./assets/two.png" alt="" />
        </div>
      </div>
      {/* <p>Click to filter:</p> */}
      <div className="filterbox" ref={fieldsSectionRef}>
        <div className="sport" onClick={() => handleClick("")}>
          <img src="./assets/Allsports.png" alt="" />
          {"" === select ? (
            <motion.div className="circle" layoutId="circleId" />
          ) : null}
        </div>
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
        <div className="sport" onClick={() => handleClick("Squash")}>
          <img src="./assets/reesha.png" alt="" />
          {"Squash" === select ? (
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
              fields.filter(e=>e.FieldType==sport).length===0?(<div className='empty-field'><h2>no old booking</h2></div>):
              (fields.filter(e=>e.FieldType==sport).map((field) => <FieldCard key={field._id} name={field.name} description={field.description} imageUrl={field.imageUrl} id={field._id} />))
            )
          }
        </div>
      )}


    </div>
    </div>
    </div>
  )
}

export default Home