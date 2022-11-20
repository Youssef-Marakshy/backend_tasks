const {
    Router
} = require('express');
const {
    loginUser,
    registerUser
} = require('../services/userManager');
const userRouter = Router();

userRouter.post('/login', async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) return res.status(500).send("Invalid email or password");
    try {
        const userDetails = await loginUser(email, password);
        userDetails.password = undefined;
        res.status(200).send(userDetails);
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message);
    }
});

userRouter.post('/register', async (req, res, next) => {
    const {
        first_name,
        last_name,
        email,
        password
    } = req.body;
    if (!first_name || !last_name) return res.status(500).send("Invalid first name or last name");
    else if (!email || !password) return res.status(500).send("Invalid email or password");
    try {
        const userDetails = await registerUser(email, password, first_name, last_name);
        userDetails.password = undefined;
        res.status(200).send(userDetails);
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
});

module.exports = userRouter;