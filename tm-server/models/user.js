const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    user: {
        type: String,
        required: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
})

module.exports = mongoose.model('User', UserSchema)