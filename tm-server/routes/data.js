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
        console.log(req.body)
        const cardColumn = await Column.findOne({id: parseInt(req.body.column)})
        // TODO: When a new column is created after others have delete the ID changes which is causing an issue
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
            const deleteCard = await Card.findByIdAndDelete(req.params.id)
            const updateCol = await Column.findOne({id: deleteCard.column})
            updateCol.cards.splice(updateCol.cards.indexOf(deleteCard.id), 1)
            updateCol.save()
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
            // Card that is being edited
            const editCard = await Card.findByIdAndUpdate(id, {...req.body})
            // Find column that card current belongs to and remove it from the cards array
            const prevCol = await Column.findOne({id: editCard.column}).populate('cards')
            prevCol.cards = prevCol.cards.filter(card => card.id !== editCard.id)
            // Find column that card is moving to and add the card to the array
            const newCol = await Column.findOne({id: req.body.column})
            newCol.cards.push(editCard)
            // Save all changes to DB
            await prevCol.save()
            await newCol.save()
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