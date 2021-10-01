const express = require('express')
const router = express.Router()
const Card = require('../models/card')
const Column =  require('../models/column')
const checkAuth = require('../helpers/checkauth')

router
    .route("/")
    .get(checkAuth, async (req, res) => {
        try {
            const result = await Card.find()
            await res.json(result)
        } catch (err) {
            res.status(400).json({
                message: "Error retrieving information from DB",
                err
            })
        }
    })
    .post(checkAuth, async (req, res) => {
        const newCard = await new Card(req.body)
        const cardColumn = await Column.find({id: req.body.column})
        console.log(cardColumn)
        await newCard.save()
        await cardColumn.cards.push(newCard)
        console.log(cardColumn)
        await cardColumn.save()
        try {
            res.status(201).json({
                message: "Added successfully"
            })
        } catch (err) {
            res.status(400).json({
                message: "Error adding to DB",
                err
            })
        }
    })

router
    .route("/:id")
    .delete(checkAuth, async (req, res) => {
        try {
            await Card.findByIdAndDelete(req.params.id)
            res.status(201).json({
                message: "Deleted successfully"
            })
        } catch (err) {
            res.status(400).json({
                message: "Error deleting",
                err
            })
        }
    })
    .patch(checkAuth, async (req, res) => {
        const {id} = req.params
        try {
            const editCard = await Card.findByIdAndUpdate(id, {...req.body})
            await editCard.save()
            res.status(201).json({
                message: "Edited successfully"
            })
        } catch (err) {
            res.status(400).json({
                message: "Error editing",
                err
            })
        }
    })

    module.exports = router