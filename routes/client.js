const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Client = require('../models/client')

router.post('/signup', async (req, res) => { 

    console.log("req.body", req.body)

    try{

        const client = await Client.create(req.body)
        const user = { email: client.email, id: client._id }
        const token = jwt.sign(user, 'my_key', { expiresIn: '2d' })

        return res.status(200).json({
            data: client,
            token: token,
            type: 'client',
            message: "Customer successfully created!"
        })

    }catch(error){
        return res.status(500).json({
            data: null,
            message: "client not created!"
        })
    }

 })
router.post('/signin', async (req, res) => {

    console.log("req.body", req.body)

    try{

        const client = await Client.findOne({email: req.body.email}).populate('food')
        const user = { email: client.email, id: client._id }
        const token = jwt.sign(user, 'my_key', { expiresIn: '2d' })
        if(client){

            // res.cookie('user', token)

            return res.status(200).json({
                data: client,
                token: token,
                type: 'client',
                message: "LoggedIn successfully!"
            })
        }
    }catch(error){
        return res.status(401).json({
            data: null,
            message: "Client not found!"
        })
    }


})

module.exports = router