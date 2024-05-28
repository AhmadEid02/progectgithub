import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const AdminLogin = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
  return (
    <div className='log-in-container'>
        <h3>Admin Log in</h3>
        <div className="admin-log-in">
            
           
                   
                    <TextField
                        id="standard-basic"
                        variant="filled"
                        label="User Name"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        sx={{ width: "100%" ,margin:3}}
                    />
                
               
                    <TextField
                        id="standard-basic"
                        variant="filled"
                        label="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        sx={{ width: "100%" ,margin:1}}
                    />
               
                <Button variant='contained' sx={{margin:1}}>log in</Button>
            
        
        </div>
    </div>
  )
}

export default AdminLogin