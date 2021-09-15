const express = require('express')
const router = express.Router()
const Card = require('../models/card')
const checkAuth = require('../helpers/checkauth')

router
    .route("/")
    .get(checkAuth, async (req, res) => {
        await Card.find()
        .then(result => res.json(result))
        .catch(err => {
            res.status(400).json({
                message: "Error retrieving information from DB",
                err
            })
        })
    })
    .post(checkAuth, async (req, res) => {
        const newCard = await new Card(req.body)
        await newCard.save()
        .then(() => {
            res.status(201).json({
                message: "Added successfully"
            })
        })
        .catch(err => {
            res.status(400).json({
                message: "Error adding to DB",
                err
            })
        })
    })

router
    .route("/:id")
    .delete(checkAuth, async (req, res) => {
        await Card.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(201).json({
                message: "Deleted successfully"
            })
        })
        .catch(err => {
            res.status(400).json({
                message: "Error deleting"
            })
        })
    })
    .patch(checkAuth, async (req, res) => {
        const {id} = req.params
        const editCard = await Card.findByIdAndUpdate(id, {...req.body})
        await editCard.save()
        .then(() => {
            res.status(201).json({
                message: "Edited successfully"
            })
        })
        .catch(err => {
            res.status(400).json({
                message: "Error editing"
            })
        })
    })

    module.exports = router