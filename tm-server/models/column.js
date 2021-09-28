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
    cards: [
        {
            type: Schema.Types.ObjectId,
            ref: "Card"
        }
    ]
})
//TO DO: WIP Below
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