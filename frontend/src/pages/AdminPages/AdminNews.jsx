import React, { useEffect, useState } from 'react'
import AdminNewsCard from './component/AdminNewsCard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const AdminNews = () => {
  const [news, setNews] = useState([{}])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("add")
  }
  const fetchData = async () => {
    const apiUrl = "http://localhost:4000/news/";
    setLoading(true)
    try {
      const response = await axios.get(`${apiUrl}`);
      setNews(response.data.news)
      
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)

    }

  };
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='field-container'>
      <div className="field-head">
        <h3>news</h3>
        <div className='add-icon' onClick={handleCreate}>
          <span className="material-symbols-outlined">
            add
          </span>
        </div>
      </div>
      {loading ? (
        <div className="loading">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        < div className='admin-news'>
          {news.map((newsItem) => (
            <AdminNewsCard key={newsItem._id} news={newsItem} />
          ))}
        </div>
      )

      }



    </div>
  )
}

export default AdminNews