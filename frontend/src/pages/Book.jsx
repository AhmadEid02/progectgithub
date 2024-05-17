import React, { useEffect, useState } from 'react'
import './book.css'
import imags from '../component/imags'
import SlideShow3 from '../component/SlideShow3'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Checkbox from '@mui/material/Checkbox';
import { Alert, Box, Button, Chip, Divider, FormControlLabel, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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

import axios from "axios"
import dayjs from 'dayjs';
const Book = () => {
    const [equipment, setEquipment] = useState([])
    const [referee, setReferee] = useState({})
    const [isextractDate, setExtractDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [selectedData, setSelectedData] = useState(dayjs())
    const [dayOfweek, setDayOfweek] = useState("")
    const [error, setError] = useState("")
    const [HoursArray, setHoursArray] = useState([])
    const [bookedDates, setBookedDates] = useState([])
    const [fieldData, setFieldData] = useState({
        "referee": {
            "refereeName": "",
            "refereeCost": null
        },
        "_id": "",
        "name": "",
        "description": "",
        "FieldType": "",
        "capacity": null,
        "features": [],
        "imageUrl": "",
        "equipment": [],
        "bookings": [],
        "createdAt": "",
        "updatedAt": "",
        "__v": 0
    });
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    const { id } = useParams()
    const fetchData = async () => {
        const apiUrl = "http://localhost:4000";
        try {
            console.log(fieldData);
            const response = await axios.get(`${apiUrl}/api/fields/${id}`);
            //const response = await axios.get(`http://localhost:4000/api/fields/661df170b896b694cb19a1cd`);
            setFieldData(response.data);
            console.log(fieldData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        const fetchDataAndHandleTime = async () => {
            await fetchData();
            handleDate(selectedData);
        };
        fetchDataAndHandleTime();

    }, []);
    useEffect(() => {
        handleBookedDates(); 
    }, [fieldData]); 
    useEffect(() => {
        // Call extractDate whenever selectedData changes
        extractDate(selectedData);

    }, [selectedData]);
    useEffect(() => {
        handleTime();
    }, [dayOfweek, selectedData, bookedDates]); 

    const extractDate = (date) => {
        const formattedDate = date.format('YYYY-MM-DD');
        console.log("Formatted Date:", formattedDate);
        setExtractDate(formattedDate)
    };
    const handleDate = (newValue) => {
        setSelectedData(newValue)
        setDayOfweek(newValue.format('dddd').toLowerCase())
    }
    const handlePayment = () => {
        if (user) {
            if(selectedTime!="")
                navigate("/payment", { state: { fieldData: { id: id, name: fieldData.name, imageUrl: fieldData.imageUrl, pricePerHour: fieldData.pricePerHour, date: isextractDate, time: selectedTime, equipment: equipment, referee } } });
                else
                setError("Please select a time")
        } else {
            setError("Please login or sign up First")
        }
        
    }
    const handleEquipmentChange = (equipmentItem, checked) => {
        if (checked) {
            setEquipment(prevEquipment => [...prevEquipment, equipmentItem]);
        } else {
            setEquipment(prevEquipment => prevEquipment.filter(eq => eq._id !== equipmentItem._id));
        }
    };
    const handleRefereeChange = (checked) => {
        setReferee(checked ? fieldData.referee : null);
    };
    const handleTime = () => {
        const hoursArray = [];
        const openingHoursOfDay = fieldData.openingHours?.[dayOfweek];

        if (openingHoursOfDay) {
            const { start, end } = openingHoursOfDay;
            const startH = parseInt(start.split(":")[0]);
            const endH = parseInt(end.split(":")[0]);

            for (let i = startH; i < endH; i++) {
                hoursArray.push(`${i}:00`);
            }
            console.log("hoursArray")
            console.log(hoursArray)
            const Day = selectedData.format('YYYY-MM-DD');
            const availableDates = hoursArray.filter(time => {
                if (bookedDates[Day]) {
                    return !bookedDates[Day].includes(time);
                } else {
                    return true;
                }
            });
            setHoursArray(availableDates)
        } else {
            console.log(`No opening hours defined for ${dayOfweek}.`);
        }
    }
    const handleBookedDates = () => {
        const bookedDatesWithTimes = {};

        fieldData.bookings.map(booking => {
            const bookedDate = new Date(booking.bookedDate).toISOString().split('T')[0];
            const bookedTime = booking.bookedTime;
            if (bookedDatesWithTimes[bookedDate]) {
                bookedDatesWithTimes[bookedDate].push(bookedTime);
            } else {
                bookedDatesWithTimes[bookedDate] = [bookedTime];
            }
        });
        setBookedDates(bookedDatesWithTimes);
        console.log(bookedDatesWithTimes);
    }
    


    return (
        <div>
            {error&&<Alert className='sticky' variant="filled" severity="error">{error}.</Alert>}
            <div className="step-container">
                <div className="step active"><span>1</span></div>
                <div className="step"><span>2</span></div>
                <div className="step-connector"></div>
            </div>
            <div className="container003">
                <div className="field-info">
                    <h1>Choose date and time</h1>
                    <h2>{fieldData.name}</h2>
                    <p>{fieldData.description}</p>
                    <div className="container-field-type">
                        <span className='secCol'>Field type:</span>
                        <div className='field-type'>
                            <p>{fieldData.FieldType}</p>
                            <span className="material-symbols-outlined">
                                sports_soccer
                            </span>
                        </div>
                    </div>

                </div>

                <SlideShow3 slides={imags} />

                <div className="features">
                    <h3>Features:</h3>

                    <List sx={style}>
                        {fieldData.features.map((feat, index) => (
                            <div key={index} id={index}>
                                <ListItem >
                                    <ListItemText primary={feat} />
                                </ListItem>
                                <Divider component="li" />
                            </div>
                        ))}
                    </List>


                </div>
                <div className="date-time">
                    <div className="date">
                        <label >Date:</label>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DateCalendar value={selectedData} onChange={(newValue) => handleDate(newValue)} disablePast={true} maxDate={dayjs().add(2, 'week')} />
                        </LocalizationProvider>
                    </div>
                    <div className="time">
                        <label >Available Times: for {isextractDate}</label>
                        <div className='time-slots'>
                            {
                                HoursArray.length !== 0 ? HoursArray.map((time, index) => (
                                    <div key={index} className={`time-selection ${time === selectedTime ? "selected" : ""}`} onClick={() => setSelectedTime(selectedTime === time ? "" : time)}>
                                        <span className="material-symbols-outlined">
                                            schedule
                                        </span>
                                        <p>{time}</p>
                                    </div>
                                )) : (
                                    <div className="time-selection" >
                                        <span className="material-symbols-outlined">
                                            sentiment_dissatisfied
                                        </span>
                                        <p>no available times</p>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>

                <List sx={style}>
                    {fieldData.equipment.map((eq, index) => (
                        <ListItem key={index} id={index} className="checkbox" sx={{ display: 'flex', justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center", my: 1, width: "200px" }}>
                                <span className="material-symbols-outlined">
                                    sports_tennis
                                </span>
                                <p> {eq.equipmentType}</p>
                            </Box>
                            <p>${eq.equipmentPrice}</p>
                            <FormControlLabel control={<Checkbox onChange={(e) => handleEquipmentChange(eq, e.target.checked)} />} />

                        </ListItem>
                    ))}
                    <Divider />
                    <ListItem className="checkbox" sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center", my: 1, width: "200px" }}>
                            <span className="material-symbols-outlined">
                                sports
                            </span>
                            <p>Add refree</p>
                        </Box>
                        <p>${fieldData.referee.refereeCost}</p>

                        <FormControlLabel sx={{ alignSelf: 'flex-end' }} control={<Checkbox onChange={e => handleRefereeChange(e.target.checked)} />} />

                        {/* <Chip label={`$${fieldData.referee.refereeCost}`} /> */}

                    </ListItem>
                </List>
                <Button variant="contained" sx={{ alignSelf: 'flex-end' }} onClick={handlePayment}>Go to payment</Button>

            </div>


        </div>
    )
}

export default Book