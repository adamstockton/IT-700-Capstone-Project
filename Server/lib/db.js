const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: 10,
    host: "database",
    user: "root",
    password: "P@ssw0rd!",
    database: "project"
});

var database = {};

database.query = function (query, values) {
    return new Promise(function (resolve, reject) {
        db.getConnection(function (e, connection) {
            if(!e) {
                connection.query(query, values, function (error, results) {
                    if(error) {
                        connection.release();
                        return reject(error);
                    }
                    connection.release();
                    return resolve(results);
                })
            } else {
                connection.release();
                return reject(e);
            }
        });
    })
}

module.exports = database;