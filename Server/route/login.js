const express = require("express");
const router = express.Router();

router.get('/', function (req, res) {
    res.send("Insert login page template here");
})

module.exports = router;