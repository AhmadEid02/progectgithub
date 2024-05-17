const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
const fieldsRoutes = require('./routes/fieldsRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/BookRoutes');

app.use('/user', userRoutes);
app.use('/api/fields', fieldsRoutes);
app.use('/book', bookRoutes);

console.log("hello word")

mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(process.env.PORT,()=>{console.log("connected to DB and listening on port 4000")})
}).catch((err)=>{console.log("error with connection to database",err)})