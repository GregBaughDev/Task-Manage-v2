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
    /* Add checkauth in below for production */
    .post(async (req, res) => {
        const colLength = await Column.find()
        const newColumn = await new Column(req.body)
        newColumn.id = colLength.length + 1
        newColumn.save()
        res.end()
    })

router
    .route("/:id")
    .delete(async (req, res) => {
        await Column.deleteOne({id: req.params.id})
        res.end()
    })

    module.exports = router