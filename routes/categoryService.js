const {
    Router
} = require('express');
const catRouter = Router();
const {
    getCategories,
    addCategory
} = require('../services/categoryManager');

catRouter.get('/', async (req, res, next) => {
    Promise.resolve().then(async () => {
        const allCats = await getCategories();
        res.status(200).send({
            "data": allCats,
            "status": "success"
        });
    }).catch(next)
});

catRouter.post('/', async (req, res, next) => {
    Promise.resolve().then(async () => {
        if (!req.headers['x-access-token'])
            throw new Error('Invalid Access Token')
        let {
            name,
            image,
            productCount
        } = req.body;
        if (!name || !image) throw new Error('Invalid category body');
        if (!productCount) productCount = 0;
        const catData = await addCategory(req.headers['x-access-token'], {
            name,
            image,
            productCount
        });
        res.status(200).send(catData);
    }).catch(next)
});

catRouter.use((err, req, res) => {
    console.error(err.message);
    res.status(500).send(err.message);
});

module.exports = catRouter;