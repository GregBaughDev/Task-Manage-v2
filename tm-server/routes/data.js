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
        const cardColumn = await Column.findOne({id: req.body.column})
        await newCard.save()
        await cardColumn.cards.push(newCard)
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
        const {id, column} = req.params
        try {
            const editCard = await Card.findByIdAndUpdate(id, {...req.body})
            let prevCol = await Column.findOne({cards: editCard._id}).populate('cards')
            let newCol = await Column.findOne({id: parseInt(id)})
            //The below isnt working!
            prevCol.cards = await prevCol.cards.splice(prevCol.cards.indexOf(editCard._id, 1))
            // console.log(prevCol)
            // console.log(newCol)
            // Find current column and update array
            // Find new column and add to array
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