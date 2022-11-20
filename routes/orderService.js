const {Router} = require('express');
const { getOrders, addOrder } = require('../services/orderManager');
const orderRouter = Router();

orderRouter.get('/', async (req, res, next) => {
    const allOrders = await getOrders();
    res.status(200).send({"data": allOrders, "status": "success"});
});

orderRouter.post('/', async (req, res, next) => {
    Promise.resolve().then(async () => {
        if (!req.headers['x-access-token'])
            throw new Error('Invalid Access Token');
        const newOrder = await addOrder(req.headers['x-access-token'], req.body);
        return res.status(200).send(newOrder);
    }).catch(next);
});

orderRouter.use((err, req, res) => {
    console.error(err.message);
    res.status(500).send(err.message);
});

module.exports = orderRouter;