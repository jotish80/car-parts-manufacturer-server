const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  productId:{
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
  }
  ,
  quantity:{
      type:Number,
      required: true
  },
  email: {
      type: String,
      required: true
  }
  ,
  phone:{
      type: Number,
      required: true
  },
  address: {
      type: String,
      required: true
  }
})

module.exports = mongoose.model('Order', orderSchema)