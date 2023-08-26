const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CarouselImage = new Schema({
    imageUrl : {
        type : 'String',
        required : true
    }
},{timestamps : true})

module.exports = mongoose.model('CarouselImage',CarouselImage)