import { Alert, Button, Divider, List, ListItem, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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

const AdminNewsUpdate = () => {
  const [news, setNews] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [newsType, setNewsType] = useState("");
  const [topics, setTopics] = useState([]);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams()

  const fetchData = async () => {
    const apiUrl = `http://localhost:4000/admin/news/${id}`;
    setLoading(true)
    try {
      const response = await axios.get(`${apiUrl}`);

      setNews(response.data.news)
      setTitle(response.data.news.title)
      setNewsDescription(response.data.news.newsDescription)
      setImageUrl(response.data.news.imageUrl)
      setNewsType(response.data.news.newsType)
      setTopics(response.data.news.topics)
      setDisable(response.data.news.disable)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)

    }

  };
  useEffect(() => {
    fetchData()
  }, [])
  const handleSubmit = async () => {
    const apiUrl = "http://localhost:4000";
    const NewsData = {
      title,
      newsDescription,
      imageUrl,
      newsType,
      topics,
      disable,
    };
    try {
      const response = await axios.put(`${apiUrl}/admin/news/update/${id}`, NewsData);
      navigate(-1);
    } catch (error) {
      console.error("Error updating news:", error);
      setError("Error updating news");
    }
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
      console.error("Error uploading image:", error);
    }
  };
  const handleMainImageDelete = () => {
    setImageUrl("")
  }
  const handleFeatureChange = (index, value) => {
    setTopics(prevState => {
      const newFeatures = [...prevState];
      newFeatures[index] = value;
      return newFeatures;
    });
  };

  const handleFeatureDelete = (index) => {
    setTopics(prevState => prevState.filter((_, i) => i !== index));
  };

  const handleAddFeature = () => {
    setTopics(prevState => [...prevState, ""]);
  };
  const handleDelete = async () => {
    try {
      const apiUrl = "http://localhost:4000";
      await axios.delete(`${apiUrl}/admin/news/${id}`);
      navigate(-1)
    } catch (error) {
      console.log(error)
      setError("error in deleting match")
    }
  }
  return (
    <div>
      {error && <Alert className='sticky' variant="filled" severity="error">{error}.</Alert>}
      
      <div className='admin-field-deatils-container'>
      <span className="material-symbols-outlined admin-delete" onClick={handleDelete}>
          delete
        </span>
        <div className='admin-field-input'>
          <h3>News Name</h3>
          <TextField
            id="standard-basic"
            variant="standard"
            value={title}
            onChange={e => setTitle(e.target.value)}
            sx={{ width: "60%" }}
          />
        </div>
        <div className='admin-field-input'>
          <h3>News Description</h3>
          <TextField
            id="standard-basic"
            variant="standard"
            value={newsDescription}
            onChange={e => setNewsDescription(e.target.value)}
            multiline
            maxRows={5}
            sx={{ width: "80%" }}
          />
        </div>
        <div className='admin-field-input'>
          <h3>Field Type</h3>
          <Select
            value={newsType}
            label="Field Type"
            onChange={e => setNewsType(e.target.value)}
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
          <h3>Main Image</h3>
          <div className="admin-image-container-edit">
            {imageUrl &&
              <div className="image-wrapper" >
                <span className="material-symbols-outlined close-icon" onClick={handleMainImageDelete}>
                  close
                </span>
                <img src={`../../../assets/fields/${imageUrl}`} alt="" />
              </div>
            }
            <div className='empty-image'>
              <input type="file" onChange={handleMainImageUpload} />
              <div className='add-icon'>
                <span className="material-symbols-outlined">
                  add
                </span>
              </div>
            </div>
          </div>


        </div>
        <h4>Topics</h4>
        <div className="admin-features">
          <List sx={style}>
            {topics.map((topic, index) => (
              <div key={index} style={{ width: '100%' }}>
                <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: '100%' }}>
                  <TextField
                    id={`feature-${index}`}
                    variant="standard"
                    value={topic}
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
        <div className='admin-field-input'>
          <h3>disable</h3>
          <Select
            value={disable}
            label="disable"
            onChange={e => setDisable(e.target.value)}
          >
            <MenuItem value={true}>true</MenuItem>
            <MenuItem value={false}>false</MenuItem>
          </Select>
        </div>
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

export default AdminNewsUpdate