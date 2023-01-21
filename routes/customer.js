const express = require('express')
const Customer = require('../models/customer')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post('/signup', async (req, res) => { 

    console.log("req.body", req.body)

    try{

        const customer = await Customer.create(req.body)
        const user = { email: customer.email, id: customer._id }
        const token = jwt.sign(user, 'my_key', { expiresIn: '1h' })

        return res.status(200).json({
            data: customer,
            token: token,
            type: 'customer',
            message: "Customer successfully created!"
        })

    }catch(error){
        return res.status(500).json({
            data: null,
            message: "Customer not created!"
        })
    }

 })
router.post('/signin', async (req, res) => {

    console.log("req.body", req.body)

    try{

        const customer = await Customer.findOne({email: req.body.email})
        const user = { email: customer.email, id: customer._id }
        const token = jwt.sign(user, 'my_key', { expiresIn: '2d' })
        if(customer){
            return res.status(200).json({
                data: customer,
                token: token,
                type: 'customer',
                message: "LoggedIn successfully!"
            })
        }
    }catch(error){
        return res.status(401).json({
            data: null,
            message: "Customer not found!"
        })
    }


})

module.exports = router