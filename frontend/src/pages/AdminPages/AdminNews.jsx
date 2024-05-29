import React, { useEffect, useState } from 'react'
import AdminNewsCard from './component/AdminNewsCard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { CircularProgress, MenuItem, Select } from '@mui/material';

const AdminNews = () => {
  const [news, setNews] = useState([{}])
  const [loading, setLoading] = useState(false)
  const [newsType,setNewsType]=useState("All")
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("add")
  }
  const fetchData = async () => {
    const apiUrl = "http://localhost:4000/admin/news/";
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
      <div className='admin-field-input' style={{margin:"1px auto"}}>
        <h3>News Type</h3>
        <Select
          value={newsType}
          label="Field Type"
          onChange={e => setNewsType(e.target.value)}
          sx={{bgcolor:"white"}}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Football">Football</MenuItem>
          <MenuItem value="Basketball">Basketball</MenuItem>
          <MenuItem value="Volleyball">Volleyball</MenuItem>
          <MenuItem value="Tennis">Tennis</MenuItem>
          <MenuItem value="Squash">Squash</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </div>
      {loading ? (
        <div className="loading">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        < div className='admin-news'>
          
          {
            newsType=="All"?(
              
                news.map((newsItem) => (
                  <AdminNewsCard key={newsItem._id} news={newsItem} />
                ))
                
            ):(
              
                news.filter(newsItem=>newsItem.newsType==newsType).map((newsItem) => (
                  <AdminNewsCard key={newsItem._id} news={newsItem} />
                ))
                
            )
          }
        </div>
      )

      }



    </div>
  )
}

export default AdminNews