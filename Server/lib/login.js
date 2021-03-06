const db = require("./db");
const { v4: uuidv4} = require("uuid");

class Login {
    constructor() {
        this.loggedIn = false;
        this.userID = 0;
        this.user = null;
    }

    // Authenticate via User Session Token
    async authenticate (token) {
        // Check for an invalid session token
        if(token == undefined || token == "" || token == null) {
            this._clearUser();
            return false;
        }
        
        // Perform database query
        try {
            var results = await db.query("SELECT `user`, expiration FROM `session` WHERE session_id = ?", token);
        } catch(e) {
            // Failed database connection
            this._clearUser();
            return false;
        }

        // Process results
        if(results.length > 0) {
            var currentTime = new Date();
            // Check if token is valid
            if(results[0].expiration > currentTime) {
                // Login valid, set properties
                this.loggedIn = true;
                this.userID = results[0].user;
                return true;
            } else {
                // Token is expired
                this._clearUser();
                return false;
            }
        } else {
            // Session does not exist
            this._clearUser();
            return false;
        }
    }

    async getUser () {
        if(this.userID != 0) {
            // Return Cache if Available
            if(this.user != null) {
                return user;
            }

            // Load user data from Database
            try {
                var results = await db.query("SELECT * FROM user WHERE `id` = ?", this.userID);
                if(results.length > 0) {
                    var tmp = {
                        id: results[0].id,
                        username: results[0].username,
                        first_name: results[0].first_name,
                        last_name: results[0].last_name,
                        type: results[0].type
                    };
                    this.user = tmp;
                    return tmp;
                }
            } catch (e) {
                return null;
            }
                
            //User not found
            return null;
        }

        // User not found
        return null;
    }

    static async authenticate(username, password) {
        // Fetch user from database
        try {
            var user = await db.query("SELECT * FROM user WHERE `username` = ? AND `password` = ?", [username, password]);
            if(user.length > 0) {
                // User credentials are valid, generate a session token for them
                var token = uuidv4().replace(/-/g, "");

                // Generate the expriation of the token
                var expiration = new Date();
                expiration.setDate(expiration.getDate() + 1);

                // Insert session into database
                await db.query("INSERT INTO session (`user`, `session_id`, `expiration`) VALUES (?,?,?)", [user[0].id, token, expiration]);
                
                // Return token to caller
                return token;
            } 
        } catch (e) {
            return null;
        }
        return null;
    }

    _clearUser () {
        this.loggedIn = false;
        this.userID = 0;
        this.user = null;
    }
}

module.exports = Login;