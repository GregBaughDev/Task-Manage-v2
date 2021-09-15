const checkAuth = (req, res, next) => {
    !req.session.user_id ? res.json({message: 'Must be logged in'}) : next()
}

module.exports = checkAuth