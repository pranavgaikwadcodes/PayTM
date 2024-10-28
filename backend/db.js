const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/PayTM')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
})

const User = mongoose.model('user', userSchema)

module.exports = { User }