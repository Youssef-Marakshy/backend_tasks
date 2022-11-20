const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  category_id: {
    type: String,
    required: true
  },
  is_featured: {
    type: Boolean,
    required: true
  },
  is_recent: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  rating_count: {
    type: Number,
    required: true
  }
});

const productObject = {
  name: "string",
  image: "string",
  desc: "string",
  category_id: "string",
  is_featured: "boolean",
  is_recent: "boolean",
  price: "number",
  discount: "number",
  rating: "number",
  rating_count: "number"
};

module.exports = {
  productModel: mongoose.model('Products', productSchema),
  productObject: productObject
};