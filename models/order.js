const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    sub_total_price: {
        type: Number,
        required: true
    },
    shipping: {
        type: Number,
        required: true
    },
    order_date: {
        type: String,
        required: true
    },
    order_details: [{
        product_id: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    shipping_info: {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        mobile_number: {
            type: String,
            required: true
        },
        address1: {
            type: String,
            required: true
        },
        address2: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip_code: {
            type: String,
            required: true
        }
    }
});

const orderObject = {
    user_id: "string",
    total_price: "number",
    sub_total_price: "number",
    shipping: "number",
    order_date: "string",
    "order_details[.]": {
        product_id: "string",
        qty: "number",
        price: "number"
    },
    shipping_info: {
        first_name: "string",
        last_name: "string",
        email: "string",
        mobile_number: "string",
        address1: "string",
        "address2?": "string",
        country: "string",
        city: "string",
        state: "string",
        zip_code: "string"
    }
};

module.exports = {
    orderModel: mongoose.model('Orders', orderSchema),
    orderObject: orderObject
}