const express = require('express')
const cors = require('cors')
const db = require('./config/mongoose')
const passport = require('./config/passportJWT')
const PORT = 8000
const app = express()

app.use(cors())
app.use(express.json())

passport.initialize()

app.use('/', require('./routes'))


app.listen(PORT, (err) => {
    if(err){
        console.log("Error", err);
        return;
    }
    console.log("Server is running😀")
})