const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const specificationSchema = new Schema({
  name: String,
  value: String
});

const productSchema = new Schema({
  name: {
    type: String,
    // required: true
  },
  image: {
    type: String,
    // required: true
  },
  price: {
    type: Number,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  category: {
    type: String,
    // required: true
  },
  specifications: [specificationSchema],
 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
