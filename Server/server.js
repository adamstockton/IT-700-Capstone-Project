'use strict';

const express = require('express');
const mysql = require('mysql');
const db_pool = mysql.createPool({
    connectionLimit: 10,
    host: "database",
    user: "root",
    password: "P@ssw0rd!",
    database: "project"
});

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/index', (req, res) => {
    res.send("This is a test index page");
});

app.get('/dbtest', (req, res) => {
    db_pool.getConnection(function (e, connection) {
        if(!e) {
            res.send("Connected!");
            connection.release();
        } else {
            res.send("Error connecting to database: " + e.message);
        }
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);