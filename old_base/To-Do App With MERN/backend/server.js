const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

const url = process.env.mongodb_url || 'mongodb://0.0.0.0:27017/todoapp'
app.use(cors())
app.use(express.json())


// setting up mongodb connection using mongoose
mongoose.connect(url, {useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex:true})
    
//mongoose.connection.dropDatabase()
const connection = mongoose.connection

connection.once('open', () =>{
    console.log("Connection to mongodb database successsful!")
})

//Adding Routers 
const taskRouter = require('./routes/tasks')

app.use('/tasks', taskRouter)

// starting server
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})
