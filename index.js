// process.env.NODE_ENV = 'production';
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const {loadRoutes} = require("./router.js");
const {database, express_port} = require('./misc/config.json');
const MainApp = express();

console.log("[START] Loading application..");
(async () => {
    await MainApp
    .use(express.json())
    .use(cors())
    .use(function(req, res, next) {
        console.log(`[REQUEST](${req.ip}) ${req.path}`);
        next();
    });
    await loadRoutes(MainApp);
    mongoose.connect(`mongodb://${database.host}/${database.database}`);
})();

mongoose.connection.once('open', () => {
    console.log('[DATABASE] Successfully connected!');
    MainApp.listen(express_port, () => console.log('[START] Loaded app successfuly!'));
});
