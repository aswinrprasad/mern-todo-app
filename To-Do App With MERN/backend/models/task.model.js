const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    id_val:{
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    completed:{
        type: Boolean,
        required: true,
        default: false
    } 
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task