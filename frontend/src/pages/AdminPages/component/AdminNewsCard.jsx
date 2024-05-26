import React from 'react'
import Chip from '@mui/material/Chip';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminNewsCard = ({ news }) => {
  const navigate = useNavigate();
  const handleEdit=()=>{
    navigate(`${news._id}/edit`)
  }

  return (
    <div className='admin-news-card' key={news._id}>
      <img src={`../../assets/fields/${news.imageUrl}`} alt="" />
      <div className='admin-news-card-content'>
        <h4>{news.title}</h4>
        <p>{news.newsDescription}</p>
        <div className='chip-container'>
          {news.topics?.map((topic, index) => (
            <Chip key={index} label={topic} variant="filled" className='chip' />
          ))}
        </div>
      </div>
      <Button sx={{alignSelf:"flex-end",color:"white"}} variant="outlined" onClick={handleEdit}>edit</Button>
    </div>
  )
}

export default AdminNewsCard