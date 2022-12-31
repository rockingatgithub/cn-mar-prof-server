const express = require('express')
const router = express.Router()
const passport = require('../config/passportJWT')
const {  sendEmail } = require('../controllers/mailer')
const Client = require('../models/client')
const Food = require('../models/food')

router.post('/addFood' , passport.authenticate('jwt', {failureRedirect: '/login', session: false}) ,  async (req, res)=>{

    try{

        console.log("the user", req.user)

        const food = await Food.create(req.body)
        const client = await Client.findById(req.user.id)
        client.food.push(food._id)
        await client.save()

        return res.status(200).json({
            data: food,
            message: "Food successfully created!"
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Server error!"
        })

    }
    


})

router.get('/getFood', passport.authenticate('jwt', {failureRedirect: '/login', session: false}) , async (req, res) => {

    try{

        const foods = await Food.find({})
        return res.status(200).json({
            foods,
            message: "Food fetched successfully!"
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Server error!"
        })
    }

} )

router.get('/orderFood', passport.authenticate('jwt', {failureRedirect: '/login', session: false}) , async  (req, res) => {

    sendEmail();
    return res.status(200).json({
        message: "Email sent successfully!"
    })

})

module.exports = router