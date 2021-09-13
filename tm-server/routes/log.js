const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

router
    .route("/")
    .post(async (req, res) => {
        const {username, password} = req.body
        const userLower = username.toLowerCase()
        const search = await User.find({user: userLower})
        if(search.length === 0) {
            return res.json({
                logged: false
            })
        }
        const validPass = await bcrypt.compare(password, search[0].password)
        if(validPass) {
            req.session.id = uuidv4
            res.json({
                logged: true,
                id: req.session.id
            })
        } else {
            res.json({
                logged: false,
            })
        }
    })
    .delete(async (req, res) => {
        delete req.session
        res.json({
            logged: false
        })
    })

module.exports = router