const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    food: [{
        type: mongoose.Types.ObjectId,
        ref: 'Food'
    }]
})

const Client = mongoose.model('Client', clientSchema)
module.exports = Client;