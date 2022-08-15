//Admin Number: 2129088
//Name: Jedidiah Phua Shengjie
//Class: DISM/FT/2B/21


var db = require('./databaseConfig.js');

var airports = {
    addAirport: function(newAirport,callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var insertAirport =
                `
                INSERT INTO airports (airportname, country, description)
                VALUES (?, ?, ?);
                `;
                dbConn.query(
                insertAirport,
                [newAirport.AirportName, newAirport.Country, newAirport.Description],
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

    findAll: function(callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                const findAllairports = "SELECT * FROM airports;";
                dbConn.query(findAllairports, (error, results) => {
                    dbConn.end();
                    if(error) {
                       return callback(error, null);
                    };
                    return callback(null, results);
                });
            };
        });
    },

    findOneAirport: function(airportid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var findOneairport = 
                `
                SELECT * FROM airports WHERE airportid = ?;
                `;
                dbConn.query(
                findOneairport,
                [airportid], 
                (error, results) => {
                    dbConn.end();
                    if(error) {
                        return callback(error, null);
                    };
                    return callback(null, results);
                })                
            };
        });
    },

    updateAirport: function(newAirport,callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var editAirport =
                `
                UPDATE airports 
                SET 
                    airportname = ?,
                    country = ?,
                    description = ?    
                WHERE airportid = ?;
                `;
                dbConn.query(
                editAirport,
                [newAirport.AirportName, newAirport.Country, newAirport.Description, newAirport.airportid],
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

    deleteAirport: function(airportid,callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var removeAirport = "DELETE FROM airports WHERE airportid = ?";
                dbConn.query(removeAirport, [parseInt(airportid)], (error,results) => {
                    dbConn.end();
                    if (error) {
                        console.log(error);
                        return callback(error, null);
                    }
                    output = "{Message: Deletion Successful}";
                    return callback(null, output);
                })
            }
        });
    },
};

module.exports = (airports);