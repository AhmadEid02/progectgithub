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
const adminBookRoutes = require('./routes/AdminBookingsRoutes');
const adminFieldRoutes = require('./routes/AdminRoutes');
const adminUploadRoutes = require('./routes/AdminUploadRoutes');
const adminNewsRoutes = require('./routes/adminNewsRoutes');
const userNewsRoutes = require('./routes/userNewsRoutes');
const adminMatchesRoutes = require('./routes/adminMatchesRoutes');
const userMatchesRoutes = require('./routes/userMatchesRoutes');

app.use('/user', userRoutes);
app.use('/api/fields', fieldsRoutes);
app.use('/book', bookRoutes);
app.use('/admin', adminBookRoutes);
app.use('/api/admin', adminFieldRoutes);
app.use('/api/upload',adminUploadRoutes );
app.use('/admin/news',adminNewsRoutes );
app.use('/news',userNewsRoutes );
app.use('/admin/matches',adminMatchesRoutes );
app.use('/matches',userMatchesRoutes );

console.log("hello word")

mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(process.env.PORT,()=>{console.log("connected to DB and listening on port 4000")})
}).catch((err)=>{console.log("error with connection to database",err)})