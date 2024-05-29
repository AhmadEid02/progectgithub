import React from 'react';
import { useNavigate } from 'react-router-dom';

const HorizontalCard = ({ book, upcoming, fieldData }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handelModify = () => {
    if (user) {
      navigate(`/book/${book.book_id}/modify`, { state: { fieldData: fieldData, bookedDuration: book.bookedDuration ,bookingId:book.book_id} });
    } else {
      setError("Please login or sign up First");
    }
  };

  return (
    <div className="field-horizontal" key={book.book_id}>
      <img src={`./assets/fields/${book.fieldData.imageUrl}`} alt="" />
      <div>
        <h3>{book.fieldData.name}</h3>
        <p>date: {book.bookedDate}</p>
        <p>time: {book.bookedTime}</p>
        <p>booked Duration: {book.bookedDuration}</p>
        {
          upcoming ? (<button onClick={handelModify}>Modify Book!</button>) : ("")
        }
      </div>
    </div>
  );
};

export default HorizontalCard;
