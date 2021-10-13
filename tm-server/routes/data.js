const express = require('express')
const router = express.Router()
const Card = require('../models/card')
const Column =  require('../models/column')
const checkAuth = require('../helpers/checkauth')
const User = require('../models/user')

router
    .route("/")
    .get(checkAuth, async (req, res) => {
        try {
            const result = await Card.find({owner: req.session.user})
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
        const cardColumn = await Column.findOne({id: parseInt(req.body.column)})
        const cardOwner = await User.findById(req.session.user)
        newCard.owner = req.session.user
        cardOwner.cards.push(newCard)
        await cardOwner.save()
        await newCard.save()
        cardColumn.cards.push(newCard)
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
        //TODO : ISSUE HERE. WHEN A CARD IS DELETED THEY ARE ALL REMOVED
        try {
            const deleteCard = await Card.findByIdAndDelete(req.params.id)
            const updateCol = await Column.findOne({id: deleteCard.column})
            const user = await User.findById(req.session.user)
            // ISSUE BELOW
            // user.cards = user.cards.filter(card => card._id === req.params.id)
            console.log(req.params.id)
            console.log(deleteCard._id)
            user.cards = user.cards.filter(card => console.log(card._id === deleteCard._id))
            //
            updateCol.cards.splice(updateCol.cards.indexOf(deleteCard.id), 1)
            await updateCol.save()
            await user.save()
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