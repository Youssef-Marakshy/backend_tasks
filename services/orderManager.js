"use strict";
const { validObject } = require('../misc/util');
const {orderModel, orderObject} = require('../models/order');
const {verifyToken, getUserById} = require('./userManager');

async function addOrder (token, data) {
    const tokenVerify = await verifyToken(token);
    if (!tokenVerify) throw new Error('Invalid Access Token provided');
    else {
        if (!validObject(orderObject, data)) throw new Error('Invalid Order object.');
        const userExist = await getUserById(data.user_id);
        if (!userExist) throw new Error('Invalid User ID');
        const newOrder = new orderModel(data);
        await newOrder.save();
        return newOrder;
    }
};

async function getOrders () {
    const allOrders = await orderModel.find();
    return allOrders;
};

module.exports = {
    addOrder: addOrder,
    getOrders: getOrders
};
