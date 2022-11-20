const {userService, productService, categoryService, orderService} = require('./routes');

async function loadRoutes (app) {
    await app
        .use('/api/users', userService)
        .use('/api/products', productService)
        .use('/api/categories',categoryService)
        .use('/api/orders', orderService);
};

module.exports = {
    loadRoutes: loadRoutes
};
