const express = require('express')
const router = express.Router()
const Column = require('../models/column')
const checkAuth = require('../helpers/checkauth')

router
    .route("/")
    .get(checkAuth, async (req, res) => {
        await Column.find()
        .then(result => res.json(result))
        .catch(err => {
            res.status(400).json({
                message: "Error retrieving information from DB",
                err
            })
        })
    })
    /* Add checkauth in below for production, just take column name and manual
    add id on before saving */
    .post(async (req, res) => {
        const colLength = await Column.find()
        console.log(colLength.length + 1)
        res.end()
    })

    module.exports = router