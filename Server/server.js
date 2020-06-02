'use strict';

const express = require('express');
const mysql = require('mysql');
const handlebars = require("express-handlebars");

// Load Database Connection
const db = require("./lib/db");

// Import router modules
const router_login = require("./route/login");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Set template engine
app.engine("handlebars", handlebars.create({
    helpers: {
        section: function(name, options) { 
          if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this); 
            return null;
        }
    }
}).engine);
app.set('view engine', 'handlebars');

// Test routes (remove for production)
app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/index', (req, res) => {
    res.send("This is a test index page");
});

app.get('/dbtest', (req, res) => {
    db.getConnection(function (e, connection) {
        if(!e) {
            res.send("Connected!");
            connection.release();
        } else {
            res.send("Error connecting to database: " + e.message);
        }
    });
});

// Handle static content
app.use('/content', express.static('www'));

// Inject Routers
app.use('/login', router_login);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);