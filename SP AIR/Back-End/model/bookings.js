//Admin Number: 2129088
//Name: Jedidiah Phua Shengjie
//Class: DISM/FT/2B/21


var db = require('./databaseConfig.js');

var bookings = {
    addBooking: function(newBooking,callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var insertBooking =
                `
                INSERT INTO bookings (flightid, userid, name, passport, nationality, age)
                VALUES (?, ?, ?, ?, ?, ?);
                `;
                dbConn.query(
                insertBooking,
                [newBooking.flightid, newBooking.userid, newBooking.username, newBooking.passport, newBooking.nationality, newBooking.age],
                (error, results) => {
                    if (error) {
                        console.log(newBooking.name);
                        console.log(error)
                        return callback(error, null);
                    };
                    const findFlightid = "SELECT bookingid FROM bookings;";
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
};

module.exports = (bookings);