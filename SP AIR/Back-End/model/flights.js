//Admin Number: 2129088
//Name: Jedidiah Phua Shengjie
//Class: DISM/FT/2B/21


var db = require('./databaseConfig.js');

var flights = {
    addFlight: function(newFlight,callback) {
        console.log(newFlight)
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var insertFlight =
                `
                INSERT INTO flights (flightCode, aircraft, originAirport, destinationAirport, embarkDate, travelTime, price)
                VALUES (?, ?, ?, ?, ?, ?, ?);
                `;
                dbConn.query(
                insertFlight,
                [newFlight.code, newFlight.aircraft, newFlight.origin, newFlight.destination, newFlight.date, newFlight.duration, newFlight.price],
                (error, results) => {
                    if (error) {
                        console.log(error)
                        return callback(error, null);
                    };
                    const findFlightid = "SELECT flightid FROM flights;";
                    dbConn.query(findFlightid, (error, results) => {
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

    findFlight: function(flightid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var findAllflights = 
                `
                SELECT flightid, flightCode, aircraft, originAirport, destinationAirport, embarkDate, travelTime, price FROM flights WHERE originAirport = ? AND destinationAirport = ?;
                `;
                dbConn.query(
                findAllflights,
                [flightid.originAirportid, flightid.destinationAirportid], 
                (error, results) => {
                    dbConn.end();
                    if(error) {
                        return callback(error, null);
                    };
                    return callback(null, results);
                });
            };
        });
    },

    findOneFlight: function(flightid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var findFlight = 
                `
                SELECT flightid, flightCode, aircraft, originAirport, destinationAirport, embarkDate, travelTime, price FROM flights WHERE flightid = ?;
                `;
                dbConn.query(
                findFlight,
                [flightid], 
                (error, results) => {
                    dbConn.end();
                    if(error) {
                       return callback(error, null);
                    };
                    return callback(null, results);
                });
            };
        });
    },

    findAllFlights: function(callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var findAllflights = 
                `
                SELECT flightid, flightCode, aircraft, originAirport, destinationAirport, embarkDate, travelTime, price FROM flights;
                `;
                dbConn.query(
                findAllflights, (error, results) => {
                    dbConn.end();
                    if(error) {
                        return callback(error, null);
                    };
                    return callback(null, results);
                });
            };
        });
    },

    updateFlight: function(newFlight,callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var editFlight =
                `
                UPDATE flights 
                SET 
                    flightCode = ?, 
                    aircraft = ?, 
                    originAirport = ?, 
                    destinationAirport = ?, 
                    embarkDate = ?,  
                    travelTime = ?, 
                    price = ?
                WHERE flightid = ?;
                `;
                dbConn.query(
                editFlight,
                [newFlight.flightcode, newFlight.aircraft, parseInt(newFlight.from), parseInt(newFlight.to), newFlight.embarkDate, newFlight.traveltime, newFlight.price, parseInt(newFlight.flightid)],
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

    deleteFlight: function(flightid,callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var removeBooking = "DELETE FROM bookings WHERE flightid = ?";
                dbConn.query(removeBooking, [parseInt(flightid)], (error,results) => {
                    if (error) {
                        console.log(error);
                        return callback(error, null);
                    }
                    var removeFlight = "DELETE FROM flights WHERE flightid = ?";
                    dbConn.query(removeFlight, [parseInt(flightid)], (error,results) => {
                        dbConn.end();
                        if (error) {
                            console.log(error);
                            return callback(error, null);
                        }
                        output = "{Message: Deletion Successful}";
                        return callback(null, output);
                    })
                })
            }
        });
    },
}

module.exports = (flights);