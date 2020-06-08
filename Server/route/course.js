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
router.get('/:course', function (req, res) {
    if(res.locals.user == null) {
        res.redirect('/login');
        return;
    }
    
    res.render("course/course", {
        user_data: res.locals.user,
        course: req.params.course
    });
});

router.get('/:course/content', function (req, res) {
    if(res.locals.user == null) {
        res.redirect('/login');
        return;
    }
    
    res.render("course/content", {
        user_data: res.locals.user,
        course: req.params.course
    });
});

router.get("/:course/meetings", function (req, res) {
    if(res.locals.user == null) {
        res.redirect('/login');
        return;
    }

    res.render("course/meeting", {
        user_data: res.locals.user,
        course: req.params.course
    });
});

router.get("/:course/discussion", function (req, res) {
    if(res.locals.user == null) {
        res.redirect('/login');
        return;
    }

    res.render("course/discussion", {
        user_data: res.locals.user,
        course: req.params.course
    });
});

router.get("/:course/manage", function (req, res) {
    if(res.locals.user == null) {
        res.redirect('/login');
        return;
    }

    if(res.locals.user.type != "instructor") {
        res.status(401).send("You are not authorized to access this resource");
        return;
    }

    res.render("course/manage", {
        user_data: res.locals.user,
        course: req.params.course
    });
});

module.exports = router;