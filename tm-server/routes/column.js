const express = require('express')
const router = express.Router()
const Column = require('../models/column')
const checkAuth = require('../helpers/checkauth')
const user = require('../models/user')

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
        /* Create a new column, access the logged in users colCount, 
        set that as the newCol id and increment it for next time.
        Not ideal for scalability but can be revisited in the future */
        const currUser = await user.findOne({id: req.session.id})
        const newColumn = await new Column(req.body)
        newColumn.id = currUser.colCount
        currUser.colCount++
        currUser.save()
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