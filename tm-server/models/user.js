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
    },
    colCount: {
        type: Number,
        required: true,
        default: 1
    },
    columns: [
        {
            type: Schema.Types.ObjectId,
            ref: "Column"
        }
    ]
})

module.exports = mongoose.model('User', UserSchema)