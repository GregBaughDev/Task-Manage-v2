const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router
    .route("/")
    .post(async (req, res) => {
        console.log(req.body)
        const {sentFrom, username, passwordFirst, passwordSecond} = req.body
        if(!sentFrom){
            return res.json({message: 'Invalid Request'})
        }
        if(passwordFirst !== passwordSecond){
            return res.json({message: 'Invalid Request'})
        }
        // TO DO: CHECK IF USERNAME ALREADY EXISTS
        try {
            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds)
            const hash = bcrypt.hashSync(passwordFirst, salt)
            const newUser = await new User({user: username, password: hash})
            await newUser.save()
            res.status(201).json({
                message: "Added successfully"
            })
        } catch (err) {
            res.status(400).json({
                message: "Error adding user"
            })
        }
    })

module.exports = router