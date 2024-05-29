import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from "axios";

const ModifyBook = () => {
  const [error, setError] = useState("");
  const [bookTimeAndDates, setBookTimeAndDates] = useState([]);
  const [selectedData, setSelectedData] = useState(dayjs().add(1, 'day'));
  const [selectedTime, setSelectedTime] = useState("");
  const [hoursArray, setHoursArray] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const fieldData = location.state?.fieldData;
  const user = JSON.parse(localStorage.getItem('user'));
  const bookedDuration = location.state?.bookedDuration;

  const fetchData = async () => {
    const apiUrl = "http://localhost:4000";
    try {
      const response = await axios.get(`${apiUrl}/api/fields/booked/${fieldData._id}`);
      setBookTimeAndDates(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleTime();
  }, [selectedData, bookTimeAndDates]);

  const handleDate = (newValue) => {
    setSelectedData(newValue);
  };

  const handleTime = () => {
    const dayOfweek = selectedData.format('dddd').toLowerCase();
    const hoursArray = [];
    const openingHoursOfDay = fieldData.openingHours?.[dayOfweek];

    if (openingHoursOfDay) {
      const { start, end } = openingHoursOfDay;
      const startH = parseInt(start.split(":")[0]);
      const endH = parseInt(end.split(":")[0]);

      for (let i = startH; i < endH; i++) {
        hoursArray.push(`${i}:00`);
      }

      const day = selectedData.format('YYYY-MM-DD');
      const availableDates = hoursArray.filter(time => {
        if (bookTimeAndDates.some(date => date.date === day && date.bookedHours.includes(time))) {
          return false;
        }
        if (bookedDuration === 120) {
          const nextHour = `${(parseInt(time.split(":")[0]) + 1).toString().padStart(2, '0')}:00`;
          if (bookTimeAndDates.some(date => date.date === day && date.bookedHours.includes(nextHour))) {
            return false;
          }
        }
        return true;
      });

      setHoursArray(availableDates);
    } else {
      console.log(`No opening hours defined for ${dayOfweek}.`);
    }
  };
  const { id } = useParams()
  const handleModifyBooking = async () => {
    if (selectedData != "" && selectedTime != "") {
      const apiUrl = "http://localhost:4000";
      try {
        const response = await axios.put(`${apiUrl}/book/modify`, {
          bookingId: id,
          newBookedDate: selectedData.format('YYYY-MM-DD'),
          newBookedTime: selectedTime,
          newBookedDuration: bookedDuration,
        },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            }
          },
        );

        if (response.status === 200) {
          navigate('/Dashboard');
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error modifying booking:", error);
        setError("Error modifying booking:");
      }
    }else{
      setError("please select date and time to continue");
    }

  };

  return (
    <div className='home-container'>
      <div className='mainContant'>
        <div>
          {error && <Alert className='sticky' variant="filled" severity="error">{error}.</Alert>}

          <div className="container003">
            <h1>Choose the new date and time</h1>
            <div className='modify-books-user'>
              <img src={`../../assets/fields/${fieldData.imageUrl}`} alt="" />
              <div>
                <h2>{fieldData?.name}</h2>
                <p>{fieldData?.description}</p>
              </div>
            </div>
            <div className="container-field-type">
              <span className='secCol'>Field type:</span>
              <div className='field-type'>
                <p>{fieldData?.FieldType}</p>
                <span className="material-symbols-outlined">
                  sports_soccer
                </span>
              </div>
            </div>
            <div className="date-time">
              <div className="date">
                <label>Date:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DateCalendar value={selectedData} onChange={(newValue) => handleDate(newValue)} disablePast={true} maxDate={dayjs().add(2, 'week')} minDate={dayjs().add(1, 'day')} />
                </LocalizationProvider>
              </div>
              <div className="time">
                <label>Available Times: for {selectedData.format('YYYY-MM-DD')}</label>
                <div>
                  <Button variant="contained" sx={{ width: "100px" }}>{bookedDuration}mins</Button>

                </div>
                <div className='time-slots'>
                  {
                    hoursArray.length !== 0 ? hoursArray.map((time, index) => (
                      <div key={index} className={`time-selection ${time === selectedTime ? "selected" : ""}`} onClick={() => setSelectedTime(selectedTime === time ? "" : time)}>
                        <span className="material-symbols-outlined">
                          schedule
                        </span>
                        <p>{time}</p>
                      </div>
                    )) : (
                      <div className="time-selection">
                        <span className="material-symbols-outlined">
                          sentiment_dissatisfied
                        </span>
                        <p>No available times</p>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <Button variant="contained" sx={{ alignSelf: 'flex-end' }} onClick={handleModifyBooking}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyBook;
