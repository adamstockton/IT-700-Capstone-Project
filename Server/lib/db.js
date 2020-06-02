const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: 10,
    host: "database",
    user: "root",
    password: "P@ssw0rd!",
    database: "project"
});

module.exports = db;