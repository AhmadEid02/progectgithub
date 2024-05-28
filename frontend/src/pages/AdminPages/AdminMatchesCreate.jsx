import { Alert, Button, MenuItem, Select, TextField } from '@mui/material'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminMatchesCreate = () => {
    const [team1, setTeam1] = useState("")
    const [team2, setTeam2] = useState("")
    const [team1Logo, setTeam1Logo] = useState("")
    const [team2Logo, setTeam2Logo] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [sport, setSport] = useState("")
    const [link, setLink] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleTeam1LogoUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:4000/api/upload/', formData);
            const newImage = response.data.filename;
            setTeam1Logo(newImage);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
    const handleTeam1logoDelete = () => {
        setTeam1Logo("")
    }
    const handleTeam2LogoUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:4000/api/upload/', formData);
            const newImage = response.data.filename;
            setTeam2Logo(newImage);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
    const handleTeam2logoDelete = () => {
        setTeam2Logo("")
    }
    const handleSubmit = async () => {
        const apiUrl = "http://localhost:4000";
        const NewsData = {
            team1,
            team2,
            team1Logo,
            team2Logo,
            date: date ? dayjs(date).format('YYYY-MM-DD') : "",
            time,
            link,
            sport,
        };
        try {
            const response = await axios.post(`${apiUrl}/admin/matches/add`, NewsData);
            navigate(-1);
        } catch (error) {
            console.error("Error creating field:", error);
            setError("Error creating field");
        }
    };
    return (
        <div>
            {error && <Alert className='sticky' variant="filled" severity="error">{error}.</Alert>}
            <div className='admin-field-deatils-container'>
                <div className='admin-field-input'>
                    <h3>team 1</h3>
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        value={team1}
                        onChange={e => setTeam1(e.target.value)}
                        sx={{ width: "60%" }}
                    />
                </div>
                <div className='admin-field-input'>
                    <h3>team 2</h3>
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        value={team2}
                        onChange={e => setTeam2(e.target.value)}
                        sx={{ width: "60%" }}
                    />
                </div>
                <div className='admin-field-input'>
                    <h3>Field Type</h3>
                    <Select
                        value={sport}
                        label="Field Type"
                        onChange={e => setSport(e.target.value)}
                    >
                        <MenuItem value="Football">Football</MenuItem>
                        <MenuItem value="Basketball">Basketball</MenuItem>
                        <MenuItem value="Volleyball">Volleyball</MenuItem>
                        <MenuItem value="Tennis">Tennis</MenuItem>
                        <MenuItem value="Squash">Squash</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </div>
                <div className='admin-field-input'>
                    <h3>team 1 logo</h3>
                    <div className="admin-image-container-edit">
                        {team1Logo &&
                            <div className="image-wrapper" >
                                <span className="material-symbols-outlined close-icon" onClick={handleTeam1logoDelete}>
                                    close
                                </span>
                                <img src={`../../../assets/fields/${team1Logo}`} alt="" />
                            </div>
                        }
                        <div className='empty-image'>
                            <input type="file" id="logo-1-file-upload" onChange={handleTeam1LogoUpload} />
                            <label htmlFor="logo-1-file-upload" className="custom-file-upload">
                                <div className='add-icon'>
                                    <span className="material-symbols-outlined">add</span>
                                </div>
                                <div className='file-button'>Choose Image</div>
                            </label>
                            {team1Logo && <div className='file-name'>{team1Logo}</div>}
                        </div>
                    </div>
                </div>
                <div className='admin-field-input'>
                    <h3>team 2 logo</h3>
                    <div className="admin-image-container-edit">
                        {team2Logo &&
                            <div className="image-wrapper" >
                                <span className="material-symbols-outlined close-icon" onClick={handleTeam2logoDelete}>
                                    close
                                </span>
                                <img src={`../../../assets/fields/${team2Logo}`} alt="" />
                            </div>
                        }
                        <div className='empty-image'>
                            <input type="file" id="logo-2-file-upload" onChange={handleTeam2LogoUpload} />
                            <label htmlFor="logo-2-file-upload" className="custom-file-upload">
                                <div className='add-icon'>
                                    <span className="material-symbols-outlined">add</span>
                                </div>
                                <div className='file-button'>Choose Image</div>
                            </label>
                            {team2Logo && <div className='file-name'>{team2Logo}</div>}
                        </div>
                    </div>
                </div>
                <div className='admin-field-input'>
                    <h3>Link</h3>
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        sx={{ width: "60%" }}
                    />
                </div>
                <div className='admin-field-input'>
                    <h3>time</h3>
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        sx={{ width: "60%" }}
                    />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DateCalendar onChange={(newValue) => setDate(newValue)} disablePast={true}  />
                </LocalizationProvider>
                <Button variant="contained" onClick={handleSubmit} sx={{ display: "flex", alignItems: "center", alignSelf: "flex-end" }}>
                    <span className="material-symbols-outlined">
                        save
                    </span>
                    <p>Save</p>
                </Button>
            </div>
        </div>
    )
}

export default AdminMatchesCreate