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
        minlength: 5
    },
    // Update user when users collections is set up
    user: {
        type: String,
        required: true,
        minlength: 1
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    // Update the below for version 2 when columns can be added
    column: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    }
})

module.exports = mongoose.model('Card', CardScema)