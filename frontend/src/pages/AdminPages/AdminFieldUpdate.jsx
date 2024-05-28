import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MenuItem, Select, TextField, Alert, List, ListItem, Divider, Box, Button } from '@mui/material';

const style = {
    p: 0,
    my: 2,
    mx: "auto",
    width: '100%',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
};

const weeksDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const AdminFieldUpdate = () => {
    const [error, setError] = useState("");
    const [field, setField] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [fieldType, setFieldType] = useState("");
    const [pricePerHour, setPricePerHour] = useState(0);
    const [openingHours, setOpeningHours] = useState({});
    const [features, setFeatures] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [imagesArray, setImagesArray] = useState([]);
    const [referee, setReferee] = useState({});
    const [imageUrl, setImageUrl] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
        const apiUrl = "http://localhost:4000";
        try {
            const response = await axios.get(`${apiUrl}/api/fields/${id}`);
            const fieldData = response.data;
            setField(fieldData);
            setName(fieldData.name);
            setDescription(fieldData.description);
            setFieldType(fieldData.FieldType);
            setPricePerHour(fieldData.pricePerHour);
            setOpeningHours(fieldData.openingHours);
            setFeatures(fieldData.features || []);
            setEquipment(fieldData.equipment || []);
            setImagesArray(fieldData.imagesArray || []);
            setReferee(fieldData.referee || {});
            setImageUrl(fieldData.imageUrl || "");
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching data");
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleSubmit = async () => {
        const apiUrl = "http://localhost:4000";
        const updateData = {
            name,
            description,
            imageUrl,
            pricePerHour,
            openingHours,
            features,
            equipment,
            imagesArray,
            "FieldType": fieldType,
            referee,
        };
        try {
            await axios.put(`${apiUrl}/api/admin/updatefield/${id}`, updateData);
            navigate(-1);
        } catch (error) {
            console.error("Error updating field:", error);
            setError("Error updating field");
        }
    };

    const handleOpeningHourChange = (day, timeType, value) => {
        setOpeningHours(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [timeType]: value
            }
        }));
    };

    const handleFeatureChange = (index, value) => {
        setFeatures(prevState => {
            const newFeatures = [...prevState];
            newFeatures[index] = value;
            return newFeatures;
        });
    };

    const handleFeatureDelete = (index) => {
        setFeatures(prevState => prevState.filter((_, i) => i !== index));
    };

    const handleAddFeature = () => {
        setFeatures(prevState => [...prevState, ""]);
    };

    const handleEquipmentChange = (index, key, value) => {
        setEquipment(prevState => {
            const newEquipment = [...prevState];
            newEquipment[index] = { ...newEquipment[index], [key]: value };
            return newEquipment;
        });
    };

    const handleEquipmentDelete = (index) => {
        setEquipment(prevState => prevState.filter((_, i) => i !== index));
    };

    const handleAddEquipment = () => {
        setEquipment(prevState => [...prevState, { equipmentType: "", equipmentPrice: "" }]);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:4000/api/upload/', formData);
            const newImage = response.data.filename;
            setImagesArray(prevState => [...prevState, newImage]);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleImageDelete = (index) => {
        setImagesArray(prevState => prevState.filter((_, i) => i !== index));
    };

    const handleRefereeName = (name) => {
        setReferee({ ...referee, "refereeName": name });
    };

    const handleRefereeCost = (cost) => {
        setReferee({ ...referee, "refereeCost": cost });
    };

    const handleMainImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:4000/api/upload/', formData);
            const newImage = response.data.filename;
            setImageUrl(newImage);
        } catch (error) {
            console.error("Error uploading main image:", error);
        }
    };

    const handleMainImageDelete = () => {
        setImageUrl("");
    };

    return (
        <div>
            {error && <Alert className='sticky' variant="filled" severity="error">{error}.</Alert>}
            <div className='admin-field-deatils-container'>
                <div className='admin-field-input'>
                    <h3>Field Name</h3>
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        sx={{ width: "60%" }}
                    />
                </div>
                <div className='admin-field-input'>
                    <h3>Field Description</h3>
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        multiline
                        maxRows={5}
                        sx={{ width: "80%" }}
                    />
                </div>
                <div className='admin-field-input'>
                    <h3>Field Type</h3>
                    <Select
                        value={fieldType}
                        label="Field Type"
                        onChange={e => setFieldType(e.target.value)}
                    >
                        <MenuItem value="Football">Football</MenuItem>
                        <MenuItem value="Basketball">Basketball</MenuItem>
                        <MenuItem value="Volleyball">Volleyball</MenuItem>
                        <MenuItem value="Tennis">Tennis</MenuItem>
                        <MenuItem value="Squash">Squash</MenuItem>
                    </Select>
                </div>
                <div className='admin-field-input'>
                    <h3>Main Image</h3>
                    <div className="admin-image-container-edit">
                        {imageUrl &&
                            <div className="image-wrapper">
                                <span className="material-symbols-outlined close-icon" onClick={handleMainImageDelete}>
                                    close
                                </span>
                                <img src={`../../../assets/fields/${imageUrl}`} alt="" />
                            </div>
                        }
                        <div className='empty-image'>
                            <input type="file" id="main-file-upload" onChange={handleMainImageUpload} />
                            <label htmlFor="main-file-upload" className="custom-file-upload">
                                <div className='add-icon'>
                                    <span className="material-symbols-outlined">add</span>
                                </div>
                                <div className='file-button'>Choose Image</div>
                            </label>
                            {imageUrl && <div className='file-name'>{imageUrl}</div>}
                        </div>
                    </div>
                </div>
                <h3>Opening Hours</h3>
                <List sx={{ style }}>
                    {weeksDays.map((day) => (
                        <ListItem key={day} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box sx={{ width: "60px" }}>
                                <p>{day.charAt(0).toUpperCase() + day.slice(1)}</p>
                            </Box>
                            <TextField
                                id={`start-${day}`}
                                variant="standard"
                                value={openingHours[day]?.start || ""}
                                onChange={e => handleOpeningHourChange(day, 'start', e.target.value)}
                                sx={{ width: "10%" }}
                            />
                            <TextField
                                id={`end-${day}`}
                                variant="standard"
                                value={openingHours[day]?.end || ""}
                                onChange={e => handleOpeningHourChange(day, 'end', e.target.value)}
                                sx={{ width: "10%" }}
                            />
                        </ListItem>
                    ))}
                </List>
                <h3>Field images</h3>
                <div className="admin-image-container-edit">
                    {imagesArray.map((img, index) => (
                        <div className="image-wrapper" key={index}>
                            <span className="material-symbols-outlined close-icon" onClick={() => handleImageDelete(index)}>
                                close
                            </span>
                            <img src={`../../../assets/fields/${img}`} alt="" />
                        </div>
                    ))}
                    <div className='empty-image'>
                        <input type="file" id="file-upload" onChange={handleImageUpload} />
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <div className='add-icon'>
                                <span className="material-symbols-outlined">add</span>
                            </div>
                            <div className='file-button'>Choose Image</div>
                        </label>
                    </div>
                </div>
                <h3>Features:</h3>
                <div className="admin-features">
                    <List sx={style}>
                        {features.map((feat, index) => (
                            <div key={index} style={{ width: '100%' }}>
                                <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: '100%' }}>
                                    <TextField
                                        id={`feature-${index}`}
                                        variant="standard"
                                        value={feat}
                                        onChange={e => handleFeatureChange(index, e.target.value)}
                                        sx={{ width: "60%" }}
                                    />
                                    <span className="material-symbols-outlined pointer" onClick={() => handleFeatureDelete(index)}>
                                        delete
                                    </span>
                                </ListItem>
                                <Divider component="li" />
                            </div>
                        ))}
                    </List>
                    <div className='add-features' onClick={handleAddFeature}>
                        <span className="material-symbols-outlined">
                            add
                        </span>
                    </div>
                </div>
                <h3>Prices</h3>
                <List sx={style}>
                    <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <p>Price Per Hour</p>
                        <Box sx={{ display: 'flex', alignItems: "center", width: "10%" }}>
                            <span className="material-symbols-outlined">
                                attach_money
                            </span>
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                type="number"
                                value={pricePerHour}
                                onChange={e => setPricePerHour(parseInt(e.target.value))}
                                sx={{ width: "50%" }}
                            />
                        </Box>
                    </ListItem>
                </List>
                <h4>Equipment</h4>
                <div className="admin-features">
                    <List sx={style}>
                        {equipment.map((eq, index) => (
                            <div key={index} style={{ width: '100%' }}>
                                <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: '100%' }}>
                                    <TextField
                                        id={`equipment-type-${index}`}
                                        variant="standard"
                                        value={eq.equipmentType}
                                        onChange={e => handleEquipmentChange(index, 'equipmentType', e.target.value)}
                                        sx={{ width: "60%" }}
                                    />
                                    <Box sx={{ display: 'flex', alignItems: "center", width: "20%" }}>
                                        <span className="material-symbols-outlined">
                                            attach_money
                                        </span>
                                        <TextField
                                            id={`equipment-price-${index}`}
                                            variant="standard"
                                            value={eq.equipmentPrice}
                                            onChange={e => handleEquipmentChange(index, 'equipmentPrice', e.target.value)}
                                            sx={{ width: "60%" }}
                                        />
                                    </Box>
                                    <span className="material-symbols-outlined pointer" onClick={() => handleEquipmentDelete(index)}>
                                        delete
                                    </span>
                                </ListItem>
                                <Divider component="li" />
                            </div>
                        ))}
                    </List>
                    <div className='add-features' onClick={handleAddEquipment}>
                        <span className="material-symbols-outlined">
                            add
                        </span>
                    </div>
                </div>
                <h4>Referee</h4>
                <List sx={style}>
                    <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <p>Referee</p>
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            value={referee.refereeName}
                            onChange={e => handleRefereeName(e.target.value)}
                            sx={{ width: "30%" }}
                        />
                        <Box sx={{ display: 'flex', alignItems: "center", width: "10%" }}>
                            <span className="material-symbols-outlined">
                                attach_money
                            </span>
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                value={referee.refereeCost}
                                onChange={e => handleRefereeCost(e.target.value)}
                                sx={{ width: "30%" }}
                            />
                        </Box>
                    </ListItem>
                </List>
                <Button variant="contained" onClick={handleSubmit} sx={{ display: "flex", alignItems: "center", alignSelf: "flex-end" }}>
                    <span className="material-symbols-outlined">
                        save
                    </span>
                    <p>save</p>
                </Button>
            </div>
        </div>
    );
};

export default AdminFieldUpdate;
