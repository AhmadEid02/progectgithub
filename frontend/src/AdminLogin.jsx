import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const AdminLogin = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [btnLoad, setBtnload] = useState(false)
  const[error,setError]=useState("")
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setBtnload(true)
      if (userName.length == 0) {
        setError("fill User Name field")
        return
      }
      if (password.length == 0) {
        setError("fill Password field")
        return
      }
      const apiUrl = "http://localhost:4000";
      const response = await axios.post(`${apiUrl}/admin/account/login`, { userName, password });
      localStorage.setItem('admin', JSON.stringify(response.data));
      navigate('/admin')
      window.location.reload();
      setUserName('');
      setPassword('');
      setError(null); // Clear error on successful login
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred"); // Use a default message if no specific message is available
      console.error(err.response?.data?.error);
     
      e.preventDefault();
    }finally{
      setBtnload(false)
    }
  }
  return (
    <>
    
    <div className='log-in-container'>
    {error && <Alert className='sticky' variant="filled" severity="error">{error}.</Alert>}
      <h3>Admin Log in</h3>
      <div className="admin-log-in">



        <TextField
          id="standard-basic"
          variant="filled"
          label="User Name"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          sx={{ width: "100%", margin: 3 }}
        />


        <TextField
          id="standard-basic"
          variant="filled"
          label="Password"
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ width: "100%", margin: 1 }}
        />

        <Button variant='contained' sx={{ margin: 1 }} onClick={handleLogin}>
          {btnLoad?<CircularProgress color="secondary" />:"log in"}
          </Button>


      </div>
    </div>
    </>
  )
}

export default AdminLogin