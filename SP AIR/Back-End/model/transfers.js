//Admin Number: 2129088
//Name: Jedidiah Phua Shengjie
//Class: DISM/FT/2B/21


var db = require('./databaseConfig.js');

var transfer = {
    findTranfer: function(airportids, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                const findOnetransfer = "SELECT * FROM transfers WHERE originAirportid = ? AND destinationAirportid = ?;";
                dbConn.query(findOnetransfer, [airportids.origin, airportids.destination], (error, results) => {
                    dbConn.end();
                    if(error) {
                        console.log(error)
                       return callback(error, null);
                    };
                    return callback(null, results);
                });
            };
        });
    },
}

module.exports = (transfer);