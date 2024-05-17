import React, { useEffect, useState } from 'react'
import HorizontalCard from '../component/HorizontalCard'
import axios from 'axios'
import { CircularProgress, Grid, Skeleton, Stack } from '@mui/material'

const Dashboard = () => {
  const [bookedFields, setBookedFields] = useState([])
  const [loading, setLoading] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const fetchData = async () => {
    setLoading(true)
    const apiUrl = "http://localhost:4000";
    try {
      const response = await axios.get(`${apiUrl}/book/booked`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setBookedFields(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchData();
  }, [])
  const today = new Date();

  // Filter upcoming bookings
  const upcomingBookings = bookedFields.filter(field => {
    const bookingDate = new Date(field.bookedDate);
    return bookingDate >= today; // Compare booking date with today's date
  });

  // Filter old bookings
  const oldBookings = bookedFields.filter(field => {
    const bookingDate = new Date(field.bookedDate);
    return bookingDate < today; // Compare booking date with today's date
  });

  return (
    <div className='dash'>
      <div className="card">
        <div className="card__img"><img src="./assets/sportbackground.jpg" alt="" /> </div>
        <div className="hii">
          <div className='avatar'>
            <div className="card__avatar"><img src="./assets/defaultUser.jpg" alt="" /></div>
            <div className="card__title">{user.name}</div>
          </div>
          <div className="ds-info">
            <div className="ds pens">
              <h6 >books <i className="fas fa-edit"></i></h6>
              <p>{bookedFields.length}</p>
            </div>
            <div className="ds projects">
              <h6 >tournament <i className="fas fa-project-diagram"></i></h6>
              <p>0</p>
            </div>
            <div className="ds posts">
              <h6 >Posts <i className="fas fa-comments"></i></h6>
              <p>0</p>
            </div>
            <div className="ds posts">
              <h6 >Posts <i className="fas fa-comments"></i></h6>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3>upcoming booking</h3>
        <div className="booking-list">
          {loading ?
            (
              <div className="empty-field">
                <CircularProgress color="secondary" />
              </div>
            ) : (
              upcomingBookings.length != 0 ?
                upcomingBookings.map(field => <HorizontalCard key={field.fieldId} id={field.fieldId} name={field.fieldData.name} date={field.bookedDate} time={field.bookedTime} />)
                :
                (<div className='empty-field'><h2>no upcoming booking</h2></div>)
            )}
        </div>
        <h3>old booking</h3>
        <div className="booking-list">
          {loading ?
            (
              <div className="empty-field">
                <CircularProgress color="secondary" />
              </div>
            ) : (
              upcomingBookings.length != 0 ?
                oldBookings.map(field => <HorizontalCard key={field.fieldId} id={field.fieldId} name={field.fieldData.name} date={field.bookedDate} time={field.bookedTime} />)
                :
                (<div className='empty-field'><h2>no old booking</h2></div>)
            )}
        </div>
      </div>

    </div>
  )
}

export default Dashboard