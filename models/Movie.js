const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    runtime: {
        type: Number,
        required: true,
    }, 
    premiered: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Movie = new mongoose.model('Movie', MovieSchema)
module.exports = Movie