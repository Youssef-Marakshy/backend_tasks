"use strict";
const { validObject } = require('../misc/util');
const {categoryModel, categoryObject} = require('../models/category');
const {
    verifyToken
} = require('./userManager');

async function getCategories(name = "") {
    let cats;
    if (name) {
        cats = await categoryModel.findOne({
            name: name
        });
    } else {
        cats = await categoryModel.find();
    }
    return cats;
};

async function getCategoryById(id) {
    const cat = await categoryModel.findById(id);
    return cat;
};

async function addCategory(token, catData) {
    const tokenVerify = await verifyToken(token);
    if (!tokenVerify) throw new Error('Invalid Access Token provided');
    if (!validObject(categoryObject, catData)) throw new Error('Invalid category object');
    const catExists = getCategories(catData.name);
    if (Object.keys(catExists).length !== 0) throw new Error('Category already exists');
    const newCat = new categoryModel(catData);
    await newCat.save();
    return newCat;
    
};

module.exports = {
    addCategory: addCategory,
    getCategories: getCategories,
    getCategoryById: getCategoryById
};