const {
    Router
} = require('express');
const {
    addProduct,
    getProducts,
    getProductById,
    getProductsBy
} = require('../services/productManager');
const prodRouter = Router();

prodRouter.post('/', async (req, res, next) => {
    Promise.resolve().then(async () => {
        if (!req.headers['x-access-token'])
            throw new Error('Invalid Access Token')
        const addedProduct = await addProduct(req.headers['x-access-token'], req.body);
        res.status(200).send(addedProduct);
    }).catch(next);
});

prodRouter.get('/', async (req, res, next) => {
    const product = await getProducts().catch(next);
    res.status(200).send({"data": product, "status": "success"});
})

prodRouter.get('/getRecent', async (req, res, next) => {
    Promise.resolve().then(async () => {
        const products = await getProductsBy('is_recent', true);
        return res.status(200).send({"data": products, "status": "success"});
    }).catch(next);
});

prodRouter.get('/getFeatured', async (req, res, next) => {
    Promise.resolve().then(async () => {
        const products = await getProductsBy('is_featured', true);
        return res.status(200).send({"data": products, "status": "success"});
    }).catch(next);
});

prodRouter.get('/:prodId', async (req, res, next) => {
    Promise.resolve().then(async () => {
        if (!req.params.prodId) throw new Error('Invalid Product ID');
        const product = await getProductById(req.params.prodId)
        res.status(200).send(product);
    }).catch(next);
});

prodRouter.get('/getByCategoryId/:catId', async (req, res, next) => {
    Promise.resolve().then(async () => {
        if (!req.params.catId) throw new Error('Invalid Category ID');
        const catProducts = await getProductsBy('category_id', req.params.catId);
        return res.status(200).send({
            "data": catProducts,
            "status": "success"
        });
    }).catch(next);
});

prodRouter.use((err, req, res) => {
    console.error(err.message);
    res.status(500).send(err.message);
});

module.exports = prodRouter;