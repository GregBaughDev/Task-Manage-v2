const express = require('express')
const router = express.Router()
const Column = require('../models/column')
const checkAuth = require('../helpers/checkauth')
const User = require('../models/user')

router
    .route("/")
    .get(checkAuth, async (req, res) => {
        try {
            const result = await User.findById(req.session.user).populate('columns')
            res.json(result.columns)
        } catch (err) {
            res.status(400).json({
                message: "Error retrieving information from DB",
                err
            })
        }
    })
    .post(checkAuth, async (req, res) => {
        try {
             /* Create a new column, access the logged in users colCount, 
            set that as the newCol id and increment it for next time.
            Not ideal for scalability but can be revisited in the future */
            const currUser = await User.findById(req.session.user)
            const newColumn = await new Column(req.body)
            newColumn.id = currUser.colCount
            newColumn.owner = req.session.user
            currUser.columns.push(newColumn)
            currUser.colCount++
            currUser.save()
            newColumn.save()
            res.end()
        } catch (err) {
            res.status(400).json({
                message: "Error saving",
                err
            })
        }
    })

router
    .route("/:id")
    .delete(async (req, res) => {
        try {
            const {id} = req.params
            const col = await Column.findOneAndDelete({id: id, owner: req.session.user})
            const user = await User.findById(req.session.user)
            user.columns.splice(user.columns.indexOf(id), 1)
            for(let card of col.cards){
                if(user.cards.includes(card._id)){
                    user.cards.splice(user.cards.indexOf(card._id), 1)
                }
            }
            await user.save()
            res.end()
        } catch (err) {
            res.status(400).json({
                message: "Error deleting columns",
                err
            })
        }
    })
    .patch(async (req, res) => {
        try {
            const {id} = req.body
            const col = await Column.findOne({id: id, owner: req.session.user})
            col.name = req.body.name
            await col.save()
            res.end()
        } catch (err) {
            console.log(err)
        }
    })

    module.exports = router