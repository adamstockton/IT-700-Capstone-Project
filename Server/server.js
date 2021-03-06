'use strict';

const express = require('express');
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");

// Load Database Connection
const db = require("./lib/db");

// Import router modules
const router_home = require("./route/home");
const router_api = require("./route/api");
const router_login = require("./route/login");
const router_subject = require("./route/subject");
const router_course = require("./route/course");

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

// Load Middleware
app.use(cookieParser());
app.use(express.json());

// Handle static content
app.use('/content', express.static('www'));

// Inject Routers
app.use('/', router_home);
app.use('/api', router_api);
app.use('/login', router_login);
app.use('/subject', router_subject);
app.use('/course', router_course);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);