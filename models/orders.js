const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
   name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    orderQuantity:{
        type: Number,
        default: 1,
    },
    availableQuantity:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    supplierName:{
        type: String,
        required: true,

    },
    image:{
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('Orders', reviewSchema)