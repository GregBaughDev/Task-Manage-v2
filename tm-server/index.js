if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoDBStore = require('connect-mongo')
const api = require('./routes/data')
const apilog = require('./routes/log')
const apicol = require('./routes/column')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const port = process.env.PORT || 5000

mongoose.connect(process.env.DB_URL,
    {useNewUrlParser: true,
    useUnifiedTopology: true})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => {
    console.log("MongoDB Atlas connected")
})

const store = MongoDBStore.create({
    mongoUrl: process.env.DB_URL,
    secret: process.env.SECRET,
    touchAfter: 24 * 60 * 60,
})

store.on("error", function(e) {
    console.log("Error with StoreDB", e)
})

app.use(express.json())
app.use(cors())
app.use(session ({
    store,
    name: "task-manage",
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 3600000,
    }
}))

app.use("/api", api)
app.use("/apilog", apilog)
app.use("/apicol", apicol)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log(`Task Manage server is listening on ${port}`)
})