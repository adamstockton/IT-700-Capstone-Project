const express = require("express");
const router = express.Router();

// Load Database Connection
const db = require("./../lib/db");

router.get('/', function (req, res) {
    res.render("login/login");
});

module.exports = router;