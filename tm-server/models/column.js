const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ColumnSchema = new Schema({
    id: {
        type: Number,
        required: true
    }, 
    name: {
        type: String,
        required: true,
        minlength: 1
    }
})

module.exports = mongoose.model('Column', ColumnSchema)