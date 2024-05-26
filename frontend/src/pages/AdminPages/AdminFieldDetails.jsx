import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Divider, List, ListItem, ListItemText } from '@mui/material';
const style = {
    p: 0,
    my: 2,
    mx: "auto",
    width: '100%',
    // maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    // display: 'flex',
    // flexWrap: 'wrap' ,
};
const AdminFieldDetails = () => {
    const [error, setError] = useState("")
    const [field, setField] = useState({})
    const { id } = useParams()
    const navigate = useNavigate();
    const fetchData = async () => {
        const apiUrl = "http://localhost:4000";
        try {
            console.log(field);
            const response = await axios.get(`${apiUrl}/api/fields/${id}`);
            setField(response.data);
            console.log(field);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        try {
            fetchData()
        } catch (error) {
            console.log(error)
        }

    },[])
    const handleEdit=()=>{
        navigate(`/admin/field/${field._id}/edit`)
    }
    return (
        <div>
            {error && <Alert className='sticky' variant="filled" severity="error">{error}.</Alert>}
            <div className='admin-field-deatils-container'>
                <div className="admin-field-deatils-control">
                    <h2>{field.name}</h2>

                    <div className="admin-field-deatils-spans">
                        <span className="material-symbols-outlined" onClick={handleEdit}>
                            edit
                        </span>
                        <span className="material-symbols-outlined red">
                            delete
                        </span>
                    </div>

                </div>

                <p>{field.description}</p>
                <div className='field-type'>
                    <p>{field.FieldType}</p>
                    <span className="material-symbols-outlined">
                        sports_soccer
                    </span>
                </div>
                <div className="admin-image-container">
                    {
                        field?.imagesArray?.map((img, index) => {
                            return (
                                <img key={index} src={`../../assets/fields/${img}`} alt="" />
                            )
                        })
                    }
                </div>
                <div className="features">
                    <h3>Features:</h3>

                    <List sx={style}>
                        {field.features?.map((feat, index) => (
                            <div key={index} id={index}>
                                <ListItem >
                                    <ListItemText primary={feat} />
                                </ListItem>
                                <Divider component="li" />
                            </div>
                        ))}
                    </List>
                </div>
                <h3>Prices:</h3>
                <List sx={style}>
                    <ListItem className="checkbox" sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center", my: 1, mx: 1, width: "200px" }}>
                            <span className="material-symbols-outlined">
                                payments
                            </span>
                            <p>Price Per Hour</p>
                        </Box>
                        <Box sx={{ mx: 1 }}>
                            <p>${
                                field.pricePerHour
                            }</p>
                        </Box>




                    </ListItem>
                    {field.equipment?.map((eq, index) => (
                        <ListItem key={index} id={index} className="checkbox" sx={{ display: 'flex', justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center", my: 1, mx: 1, width: "200px" }}>
                                <span className="material-symbols-outlined">
                                    sports_tennis
                                </span>
                                <p> {eq.equipmentType}</p>
                            </Box>
                            <p>${eq.equipmentPrice}</p>


                        </ListItem>
                    ))}
                    <Divider />
                    <ListItem className="checkbox" sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center", my: 1, mx: 1, width: "200px" }}>
                            <span className="material-symbols-outlined">
                                sports
                            </span>
                            <p>Add refree</p>
                        </Box>
                        <p>${field.referee?.refereeCost}</p>





                    </ListItem>
                </List>
                <h2>fields books:{field.bookings?.length}</h2>
                <List sx={style}>
                    {
                        field.bookings?.map((book, index) => {
                            return (
                                <ListItem sx={{ display: 'flex', justifyContent: "space-between" }}>
                                    <p>{book.bookedDate.split("T")[0]}</p>
                                    <p>{book.bookedTime}</p>
                                    <p>{book.bookedDuration}</p>
                                </ListItem>
                            )
                        })
                    }

                </List>
            </div>
        </div>
    )
}

export default AdminFieldDetails