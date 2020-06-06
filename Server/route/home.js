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
    if(res.locals.user == null) {
        res.redirect('/login');
        return;
    }
    
    res.render("home/home", {
        user_data: res.locals.user
    });
});

module.exports = router;