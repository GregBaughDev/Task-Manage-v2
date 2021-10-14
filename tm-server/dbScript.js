// Script for clearing local DB data for dev

const mongoose = require('mongoose')

const User = require('./models/user')
const Column = require('./models/column')
const Cards = require('./models/card')

let dbConnection

if(process.env.NODE_ENV !== 'production'){
    dbConnection = 'mongodb://localhost:27017/task-manage'
} 

mongoose.connect(dbConnection,
    {useNewUrlParser: true,
    useUnifiedTopology: true})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => {
    console.log("Delete local DB script running...")
})

const deleteTestData = async () => {
    await User.deleteMany({})
    await Column.deleteMany({})
    await Cards.deleteMany({})
} 

deleteTestData().then(() => {
    mongoose.connection.close()
})
