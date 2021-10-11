const mongoose = require('mongoose')
const Card = require('../models/card')
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
    }, 
    owner: {
        type: String,
        required: true,
    },
    cards: [
        {
            type: Schema.Types.ObjectId,
            ref: "Card"
        }
    ]
})
// Below removes all cards in a column when the column is deleted
ColumnSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Card.deleteMany({
            _id: {
                $in: doc.cards
            }
        })
    }
})

module.exports = mongoose.model('Column', ColumnSchema)