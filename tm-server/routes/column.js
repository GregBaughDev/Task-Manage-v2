const express = require('express')
const router = express.Router()
const Column = require('../models/column')
const checkAuth = require('../helpers/checkauth')

router
    .route("/")
    .get(checkAuth, async (req, res) => {
        try {
            const result = await Column.find()
            res.json(result)
        } catch (err) {
            res.status(400).json({
                message: "Error retrieving information from DB",
                err
            })
        }
    })
    .post(checkAuth, async (req, res) => {
        const colLength = await Column.find()
        const newColumn = await new Column(req.body)
        newColumn.id = colLength.length + 1
        newColumn.save()
        res.end()
    })

router
    .route("/:id")
    .delete(async (req, res) => {
        const {id} = req.params
        await Column.findOneAndDelete({id: id})
        res.end()
    })

    module.exports = router