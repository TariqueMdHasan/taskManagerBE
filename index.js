const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./Config/db.js')
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser')

const authRoutes = require('./Routes/authRoutes.js')
const todoRoutes = require('./Routes/todoRoutes.js')

dotenv.config();

const app = express()
connectDB();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




const PORT = process.env.PORT || 8000;


app.use('/api/auth', authRoutes)
app.use('/api/task', todoRoutes)






app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT, (req, res)=>{
    console.log(`Server running at ${PORT}`)
})
