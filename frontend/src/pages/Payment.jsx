import React, { useEffect, useState } from 'react'
import './book.css'
import TextField from '@mui/material/TextField';
import { Alert, Box, Button, Checkbox, List, ListItem, Step, StepLabel, Stepper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from '../component/Popup';
const style = {
  p: 0,
  my: 2,
  mx: "auto",
  width: '100%',
  // maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  // display: 'flex',
  // flexWrap: 'wrap' ,
};
const Payment = () => {
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fieldData = location.state.fieldData;
  const user = JSON.parse(localStorage.getItem('user'))
  const sum = parseFloat(fieldData.bookedDuration == 60 ? fieldData.pricePerHour : fieldData.pricePerHour * 2) + (fieldData.referee.refereeCost ? parseFloat(fieldData.referee.refereeCost) : 0) +
    fieldData.equipment.reduce((acc, curr) => acc + parseFloat(curr.equipmentPrice), 0);
  useEffect(() => {
    console.log(fieldData.referee)
  }, []);
  const handleCheckout = async () => {
    if (!checked) {
      setError("Please agree to the terms and conditions to continue.");
      return;
    }
    try {
      const apiUrl = "http://localhost:4000";
      const response = await axios.post(
        `${apiUrl}/book`,
        {
          "fieldId": fieldData.id,
          "bookedDate": fieldData.date,
          "bookedTime": fieldData.time,
          "equipment": fieldData.equipment,
          "referee": fieldData.referee,
          "bookedDuration": fieldData.bookedDuration,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response.data)
      navigate('/dashboard')

    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
    }
  }
  const goback = () => {
    navigate(-1);
  }
  return (
    <>
      <div className='container'>
        <div className='mainContant'>
          {error && <Alert className='sticky' variant="filled" severity="error">{error}.</Alert>}
          <div className="step-container">
            {/* <div className="step"><span>1</span></div>
        <div className="step active"><span>2</span></div>
        <div className="step-connector"></div> */}
            <Stepper activeStep={1} alternativeLabel sx={{ width: "100%", mx: "auto", color: "white", '.MuiStepLabel-label': { color: 'white', fontSize: '1.2rem' }, '.MuiStepIcon-root': { fontSize: '2rem' } }}>
              <Step className='stepMui'>
                <StepLabel>

                </StepLabel>
              </Step>
              <Step>
                <StepLabel>

                </StepLabel>
              </Step>
            </Stepper>
          </div>
          <div className="container003 payment">
            <div className="deatails">
              <h1>Fill payment information</h1>
              <div className='photo-title'>

                <div className="image-container">
                  <img className="image" src={`./assets/${fieldData.imageUrl}`} alt="Main Image" />
                </div>
                <div className='title'>
                  <h3>{fieldData.name}</h3>
                  <h3>date : {fieldData.date}</h3>
                  <h3>Time : {fieldData.time}</h3>
                </div>

              </div>

              <div className="course">
                <div className="course-row">
                  <span className="">
                    {fieldData.name}
                  </span>
                  <span className="">${fieldData.bookedDuration == 60 ? fieldData.pricePerHour : fieldData.pricePerHour * 2}</span>
                </div>
                <span>{fieldData.bookedDuration} mins book</span>
              </div>
              {
                fieldData.equipment.map((eq,index) => (
                  <div className="course" key={index}>
                    <div className="course-row" id={eq._id}>
                      <span className="">
                        {eq.equipmentType}
                      </span>
                      <span className="">${eq.equipmentPrice}</span>
                    </div>
                    <span>1 football</span>
                  </div>
                ))
              }
              {fieldData.referee.refereeCost && (
                <div className="course">
                  <div className="course-row">
                    <span className="">
                      Add referee
                    </span>
                    <span className="">${fieldData.referee.refereeCost}</span>
                  </div>
                  <span>1 referee</span>
                </div>
              )}
              <hr />
              <div className="course">
                <div className="course-row">
                  <span className="">
                    total
                  </span>
                  <span className="">${sum}</span>
                </div>
              </div>
              <div>
                <h3>payment information</h3>
                <div className='credit'>
                  <p>card name holder</p>
                  <div className='card-num'>
                    <input type="text" placeholder='First name' />

                  </div>
                  <div className='card-num'>
                    <input type="text" placeholder='Last name' />
                  </div>


                </div>
                <div className='credit'>
                  <p>card</p>
                  <div className='card-num'>
                    <span className="material-symbols-outlined">
                      credit_card
                    </span>
                    <input type="text" placeholder='crad number' />
                  </div>
                  <div className='card-date'>
                    <input type="text" placeholder='MM' />
                    <p>/</p>
                    <input type="text" placeholder='YY' />
                  </div>


                </div>
              </div>
             
              <Popup checked={checked} setChecked={setChecked}/>
              <Box sx={{ display: "flex", justifyContent: "space-between", m: 2 }}>

                <Button variant="outlined" onClick={goback}>go back</Button>
                <Button variant="contained" onClick={handleCheckout}>BOOK at ${sum}</Button>

              </Box>
              


            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default Payment