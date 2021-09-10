const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tasks: [{
        id_val: {
            type: Number,
            required: true
        },
        desc: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        completed: {
            type: Boolean,
            default: false
        }
    }],
    logged: {
        type: Boolean,
        required: true,
        default: false
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User