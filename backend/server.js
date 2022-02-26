const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express()

// use PORT in .env file if provided, else use the hardcoded PORT number
const port = process.env.PORT || 5000

// use MONGO_URL in .env file if provided, else use the hardcoded link
const url = process.env.MONGO_URL || 'mongodb://mongo:27017/todousers'
app.options('*', cors())
app.use(cors())
app.use(express.json())


// setting up mongodb connection using mongoose
mongoose.connect(url, {useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex:true})
    
//mongoose.connection.dropDatabase()
const connection = mongoose.connection

connection.once('open', () =>{
    console.log("Connection to mongodb database successsful!")
})

// Adding Routers 
const userRouter = require('./routes/users')

// The base api endpoint will look like http://<server-name>:5000/api/users
app.use('/api/users', userRouter)

// starting server
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})

