const express = require("express");
const router = express.Router();

// Load Database Connection
const db = require("./../lib/db");

// Load Authentication System
const Login = require("./../lib/login");

// Authentication Middleware
router.use(async function (req, res, next) {
    // Process authentication token and log user in
    var login = new Login(); 
    await login.authenticate(req.cookies.user_session);
    res.locals.user = await login.getUser();
    next();
});

// Routes
router.get('/', function (req, res) {
    console.log("Logged in: " + (res.locals.user != null ? "Yes" : "No"));
    console.log(JSON.stringify(res.locals.user));
    res.render("login/login");
});

router.post('/authenticate', function (req, res) {

});

router.post('/', function (req, res) {

});

module.exports = router;