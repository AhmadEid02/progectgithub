import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import AdminMatchesCard from './component/AdminMatchesCard';

const AdminMatches = () => {
  const [matches, setMatches] = useState([{}])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("add")
  }
  const fetchData = async () => {
    const apiUrl = "http://localhost:4000/matches/";
    
    try {
      setLoading(true)
      const response = await axios.get(`${apiUrl}`);
      setMatches(response.data.matches)

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
        <h3>Matches</h3>
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
        <div className='matches'>
          <ul>
            {matches.map((matchItem) => (
              <AdminMatchesCard key={matchItem._id} match={matchItem} />
            ))}
          </ul>
        </div>
      )

      }



    </div>
  )
}

export default AdminMatches