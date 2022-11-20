"use strict";
const {
    validObject
} = require('../misc/util');
const {
    productModel,
    productObject
} = require('../models/product');
const {
    getCategoryById
} = require('./categoryManager');
const {
    verifyToken
} = require('./userManager');

async function getProducts(name = "") {
    let products;
    if (!name) {
        products = await productModel.find();
    } else {
        products = await productModel.findOne({
            name: name
        });
    }
    return products;
}

async function getProductsBy(type, value) {
    let field = {};
    field[type] = value;
    const productsResults = await productModel.find(field);
    return productsResults;
}

async function getProductById(id) {
    const product = await productModel.findById(id);
    return product;
}

async function addProduct(token, product) {
    const tokenVerify = await verifyToken(token);
    if (!tokenVerify) throw new Error('Invalid Access Token provided');
    if (!validObject(productObject, product)) throw new Error('Invalid product object.');
    const prodExist = await getProducts(product.name);
    if (prodExist) throw new Error('Product already Exists');
    const prodCat = await getCategoryById(product.category_id);
    if (prodCat && Object.keys(prodCat).length > 0) {
        const newProd = new productModel(product);
        await newProd.save();
        prodCat.productCount += 1;
        await prodCat.save();
        return newProd;
    } else {
        throw new Error('Invalid Category ID');
    }
}

module.exports = {
    addProduct: addProduct,
    getProducts: getProducts,
    getProductsBy: getProductsBy,
    getProductById: getProductById
};
