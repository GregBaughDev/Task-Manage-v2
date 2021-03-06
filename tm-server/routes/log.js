const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const checkAuth = require('../helpers/checkauth')

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
            req.session.user_id = "logged"
            req.session.user = search[0]._id
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
    .delete(checkAuth, async (req, res) => {
        req.session.destroy()
        res.json({
            message: "Logged out",
            logged: false
        })
    })

module.exports = router