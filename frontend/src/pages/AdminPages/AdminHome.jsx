import React, { useEffect, useState } from 'react'
import AdminFieldCard from './component/AdminFieldCard';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const AdminHome = () => {
  const [fields, setFields] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const fetchData = async () => {
    const apiUrl = "http://localhost:4000/api/fields";
    setLoading(true)
    const response = await axios.get(`${apiUrl}`);
    setLoading(false)
    setFields(response.data);
    console.log(response.data)
  };
  useEffect(() => {
    fetchData()
  }, [])
  const handleCreate = () => {
    navigate("create")
  }
  return (
    <div className='field-container'>
      <div className="field-head">
        <h3>Fields</h3>
        <div className='add-icon' onClick={handleCreate}>
          <span class="material-symbols-outlined">
            add
          </span>
        </div>
      </div>
      {loading &&
        <div className="loading">
          <CircularProgress color="secondary" />
        </div>
      }
      <div className='fields'>
        {fields.map((field, index) => {
          return (
            <AdminFieldCard field={field} id={index} />
          )
        })}
      </div>

    </div>
  )
}

export default AdminHome