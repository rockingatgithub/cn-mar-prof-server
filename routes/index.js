const express = require('express')
const passport = require('passport')
const router = express.Router()

router.use('/client', require('./client')  )
router.use('/customer', require('./customer'))
router.use('/food', require('./food'))

router.get('/profile', passport.authenticate('jwt', {failureRedirect: '/login', session: false}),
    (req, res) => {
        if(req.user){
            return res.status(200).json({
                data: req.user,
                type: 'client',
                message: "Client successfully found!"
            })
        }
        return res.status(401).json({
            data: {},
            message: "Client not found!"
        })
    }
)


module.exports = router
