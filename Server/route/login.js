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

router.get("/register", function (req, res) {
    res.render("login/register");
});

router.post('/authenticate', async function (req, res) {
    console.log(req.body.username);
    // Check for payload properties
    if(req.body.username == undefined || req.body.password == undefined) {
        // Missing username or password, send failure
        res.status(401).send({status:"failure"});
        return;
    }

    // Process login
    var token = await Login.authenticate(req.body.username, req.body.password);
    if(token != null) {
        res.send({status:"success",token:token});
        return;
    }
    res.status(401).send({status:"failure"});
});

router.post('/register', async function (req, res) {
    // Create User
    try {
        var results = await db.query("INSERT INTO user (`username`, `password`, `first_name`, `last_name`, `type`) VALUES (?, ?, ?, ?, 'student')", [req.body.username, req.body.password, req.body.first_name, req.body.last_name]);
    } catch {
        res.status(400).send({status:"failure"});
        return;
    }

    // Process Login
    var token = await Login.authenticate(req.body.username, req.body.password);
    if(token != null) {
        res.send({status:"success",token:token});
        return;
    }
    res.status(400).send({status:"failure"});
});

module.exports = router;