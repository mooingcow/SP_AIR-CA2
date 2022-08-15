//Admin Number: 2129088
//Name: Jedidiah Phua Shengjie
//Class: DISM/FT/2B/21


var db = require('./databaseConfig.js');

var user = {
    addUser: function(newUser,callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var insertUser =
                `
                INSERT INTO users (username, email, contact, password, role, profile_pic_url)
                VALUES (?, ?, ?, ?, ?, ?);
                `;
                dbConn.query(
                insertUser,
                [newUser.UserName, newUser.Email, newUser.Contact, newUser.Password, newUser.Role, newUser.Profile],
                (error, results) => {
                    if (error) {
                        console.log(error)
                        return callback(error, null);
                    };
                    const findUserid = "SELECT userid FROM users;";
                    dbConn.query(findUserid, (error, results) => {
                        dbConn.end();
                        if(error) {
                            console.log(error)
                            return callback(error, null);
                        };
                        var output = results.slice(-1);
                        return callback(null, output);
                    });
                })
            }
        });
    },

    findAll: function(callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                const findAllusers = "SELECT * FROM users;";
                dbConn.query(findAllusers, (error, results) => {
                    dbConn.end();
                    if(error) {
                       return callback(error, null);
                    };
                    return callback(null, results);
                });
            };
        });
    },

    findOne: function(userid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                const findOneuser = "SELECT * FROM users WHERE userid = ?;";
                dbConn.query(findOneuser, [userid], (error, results) => {
                    dbConn.end();
                    if(error) {
                       return callback(error, null);
                    };
                    return callback(null, results);
                });
            };
        });
    },

    updateUser: function(newUser,callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var editUser =
                `
                UPDATE users 
                SET 
                    username = ?,
                    email = ?,
                    contact = ?,
                    password = ?,
                    role = ?,
                    profile_pic_url = ?    
                WHERE userid = ?;
                `;
                dbConn.query(
                editUser,
                [newUser.UserName, newUser.Email, newUser.Contact, newUser.Password, newUser.Role, newUser.Profile, newUser.userid],
                (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log(error)
                        return callback(error, null);
                    };
                    return callback(null, null);
                })
            }
        });
    },
    
    verify: function (username, password, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                const query = "SELECT * FROM users WHERE username=? and password=?";
                dbConn.query(query, [username, password], (error, results) => {
                    if (error) {
                        callback(error, null);
                        return;
                    }
                    if (results.length === 0) {
                        return callback(null, null);
                    } else {
                        const user = results[0];
                        console.log(user)
                        return callback(null, user);
                    }
                });
            }
        });
    },
};

module.exports = (user);