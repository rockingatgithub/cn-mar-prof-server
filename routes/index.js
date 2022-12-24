const express = require('express')
const router = express.Router()

router.use('/client', require('./client')  )
router.use('/customer', require('./customer'))
router.use('/food', require('./food'))


module.exports = router
