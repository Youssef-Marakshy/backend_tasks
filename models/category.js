const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    productCount: {
        type: Number,    
        required: true
    }
});

const categoryObject = {
    name: "string",
    image: "string",
    productCount: "number"
};

module.exports = {
    categoryModel: mongoose.model('Categories', categorySchema),
    categoryObject: categoryObject
};