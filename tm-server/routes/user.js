const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router
    .route("/")
    .post(async (req, res) => {
        const {sentFrom, passwordFirst, passwordSecond} = req.body
        if(!sentFrom){
            return res.json({message: 'Invalid Request'})
        }
        if(passwordFirst !== passwordSecond){
            return res.json({message: 'Invalid Request'})
        }
        const username = req.body.username.toLowerCase()
        const userExists = await User.find({user: username})
        if(userExists.length === 0){
            try {
                const saltRounds = 10
                const salt = bcrypt.genSaltSync(saltRounds)
                const hash = bcrypt.hashSync(passwordFirst, salt)
                const newUser = await new User({user: username, password: hash})
                await newUser.save()
                res.status(201).json({
                    userInSystem: false,
                    message: "Added successfully"
                })
            } catch (err) {
                res.status(400).json({
                    message: "Error adding user"
                })
            }
        } else {
            res.status(201).json({
                userInSystem: true
            })
        }
    })

module.exports = router