import axios from 'axios';
import React, { useEffect, useState, useCallback, useMemo, Suspense } from 'react';
import { Button, CircularProgress, MenuItem, Select } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Lazy load AdminBookCard component
const AdminBookCard = React.lazy(() => import('./component/AdminBookCard'));

const AdminBooks = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [fieldType, setFieldType] = useState("All");
  const [books, setBooks] = useState([]);
  const [upcoming, setUpcoming] = useState(false);
  const [upcomingBooks, setUpcomingBooks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();

  const fetchData = useCallback(async () => {
    const apiUrl = "http://localhost:4000/admin/books";

    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}`);
      setBooks(response.data);
      handleUpcomingList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExpand = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleUpcomingList = useCallback((bookList) => {
    const upcomingBookings = bookList.filter(book => {
      const bookingDate = new Date(book.bookedDate);
      return bookingDate >= today; // Compare booking date with today's date
    });
    setUpcomingBooks(upcomingBookings);
  }, [today]);

  const handleByDateToggle = useCallback(() => {
    if (openDate) {
      setOpenDate(false);
      setSelectedDate(null);
    } else {
      setOpenDate(true);
      setUpcoming(false);
    }
  }, [openDate]);

  const handleDateChange = useCallback((day) => {
    setSelectedDate(day); // Update selectedDate with the new dayjs object
  }, []);

  const handleUpcomingToggle = useCallback(() => {
    if (upcoming) {
      setUpcoming(false);
    } else {
      setUpcoming(true);
      setOpenDate(false);
      setSelectedDate(null);
    }
  }, [upcoming]);

  const filteredBooks = useMemo(() => {
    if (fieldType === "All") {
      if (upcoming) {
        return upcomingBooks;
      } else if (selectedDate) {
        return books.filter(book => dayjs(book.bookedDate).isSame(selectedDate, 'day'));
      } else {
        return books;
      }
    } else {
      if (upcoming) {
        return upcomingBooks.filter(book => book.fieldType === fieldType);
      } else if (selectedDate) {
        return books.filter(book => book.fieldType === fieldType && dayjs(book.bookedDate).isSame(selectedDate, 'day'));
      } else {
        return books.filter(book => book.fieldType === fieldType);
      }
    }
  }, [fieldType, upcoming, upcomingBooks, selectedDate, books]);

  return (
    <div className='book-container'>
      <h3>Books</h3>
      <div className="books">

        <div className="books-row special">
          <div className='admin-field-input'>
            <h3>Field Type</h3>
            <Select
              value={fieldType}
              label="Field Type"
              onChange={e => setFieldType(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Football">Football</MenuItem>
              <MenuItem value="Basketball">Basketball</MenuItem>
              <MenuItem value="Volleyball">Volleyball</MenuItem>
              <MenuItem value="Tennis">Tennis</MenuItem>
              <MenuItem value="Squash">Squash</MenuItem>
            </Select>
          </div>
          <Button variant={upcoming ? 'contained' : "outlined"} onClick={handleUpcomingToggle}>upcoming</Button>
          <Button variant={openDate ? 'contained' : "outlined"} onClick={handleByDateToggle}>by date</Button>
        </div>
        {openDate &&
          <div className="books-row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </div>}

        <div className="books-row">
          <p>Total number of {upcoming ? "upcoming " : selectedDate ? "by date " : ""}books</p>
          <p>{filteredBooks.length}</p>
        </div>

        {loading && (
          <div className="loading">
            <CircularProgress color="secondary" />
          </div>
        )}

        <Suspense fallback={<div>Loading...</div>}>
          {filteredBooks.map((book, index) => (
            <AdminBookCard open={open} id={index} handleExpand={handleExpand} book={book} key={index} />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default AdminBooks;
