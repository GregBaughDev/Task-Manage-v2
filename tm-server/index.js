if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const session = require('express-session')
const mongoose = require('mongoose')
const api = require('./routes/data')
const apilog = require('./routes/log')
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

app.use(express.json())
app.use(cors())
app.use(session ({
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

app.listen(port, () => {
    console.log(`Task Manage server is listening on ${port}`)
})