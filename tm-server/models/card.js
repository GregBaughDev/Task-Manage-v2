const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardScema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1
    },
    dateTime: {
        type: String,
        required: true,
        minlength: 1
    },
    user: {
        type: String,
        required: true,
        minlength: 1
    },
    description: {
        type: String,
        required: true,
        minlength: 1
    },
    column: {
        type: Number,
        required: true,
        min: 1
    },
    owner: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Card', CardScema)