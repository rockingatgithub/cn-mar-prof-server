const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mern_swiggy')

const db = mongoose.connection

db.once('open', (err) =>{
    if(err){
        console.log("Error connecting DB!", err)
        return
    }
    console.log("Connected to DB👓")
})


module.exports = db