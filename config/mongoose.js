const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://codingninjas:jZUu0JTNxm1qEU91@cluster0.uy2kh.mongodb.net/?retryWrites=true&w=majority')

const db = mongoose.connection

db.once('open', (err) =>{
    if(err){
        console.log("Error connecting DB!", err)
        return
    }
    console.log("Connected to DB👓")
})


module.exports = db