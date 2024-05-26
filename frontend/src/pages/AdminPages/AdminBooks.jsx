import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import AdminBookCard from './component/AdminBookCard';
import { CircularProgress } from '@mui/material';
const AdminBooks = () => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [fieldType, setFieldType] = useState("")
  const [books, setBooks] = useState([])
  const fetchData = async () => {
    const apiUrl = "http://localhost:4000/admin/books";
    setLoading(true)
    const response = await axios.get(`${apiUrl}`);
    setLoading(false)
    setBooks(response.data);
    console.log(response.data)
  };
  useEffect(() => {
    fetchData();
  }, [])
  const handleClick = (div) => {
    setFieldType(fieldType == div ? "" : div)
  }
  const handleExpand = () => {
    setOpen(!open)
  }
  return (
    <div className='book-container'>
      <h3>Books</h3>
      <div className="books">

        <div className="filterbox" >
          <div className="sport" onClick={() => handleClick("")}>
            <img src="../../assets/Allsports.png" alt="" />
            {"" === fieldType ? (
              <motion.div className="circle" layoutId="circleId" />
            ) : null}
          </div>
          <div className="sport" onClick={() => handleClick("Basketball")}>
            <img src="../../assets/basketball2.png" alt="" />
            {"Basketball" === fieldType ? (
              <motion.div className="circle" layoutId="circleId" />
            ) : null}
          </div>
          <div className="sport" onClick={() => handleClick("Football")}>
            <img src="../../assets/football.png" alt="" />
            {"Football" === fieldType ? (
              <motion.div className="circle" layoutId="circleId" />
            ) : null}
          </div>
          <div className="sport" onClick={() => handleClick("Squash")}>
            <img src="../../assets/reesha.png" alt="" />
            {"Squash" === fieldType ? (
              <motion.div className="circle" layoutId="circleId" />
            ) : null}
          </div>
          <div className="sport" onClick={() => handleClick("Volleyball")}>
            <img src="../../assets/volleyball.png" alt="" />
            {"Volleyball" === fieldType ? (
              <motion.div className="circle" layoutId="circleId" />
            ) : null}
          </div>
          <div className="sport" onClick={() => handleClick("Tennis")}>
            <img src="../../assets/tennis.png" alt="" />
            {"Tennis" === fieldType ? (
              <motion.div className="circle" layoutId="circleId" />
            ) : null}
          </div>
        </div>
        <div className="books-row">
          {
            fieldType == "" ? (

              <>
                <p> total number of books</p>
                <p> {books.length}</p>
              </>
            )
              :
              (
                <>
                  <p> filter number of books</p>
                  <p> {books.filter(book => book.fieldType == fieldType).length}</p>
                </>
              )
          }
        </div>
        {loading &&
          <div className="loading">
            <CircularProgress color="secondary" />
          </div>
        }
        {fieldType == "" ?
          (books.map((book, index) => {
            return (
              <AdminBookCard open={open} id={index} handleExpand={handleExpand} book={book} />
            )
          }))
          :
          (
            books.filter(book => book.fieldType == fieldType).map((book, index) => {
              return (
                <AdminBookCard open={open} id={index} handleExpand={handleExpand} book={book} />
              )
            })
          )
        }
      </div>
    </div>
  )
}

export default AdminBooks