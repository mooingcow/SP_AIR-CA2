//Admin Number: 2129088
//Name: Jedidiah Phua Shengjie
//Class: DISM/FT/2B/21


var db = require('./databaseConfig.js');

var promotion = {
    addPromotion: function(newPromotion,callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var insertPromotion =
                `
                INSERT INTO promotions (promoflightid, promostart, promoend, discount)
                VALUES (?, ?, ?, ?);
                `;
                dbConn.query(
                insertPromotion,
                [newPromotion.promoflightid, newPromotion.promostart, newPromotion.promoend, newPromotion.discount],
                (error, results) => {
                    if (error) {
                        console.log(error)
                        return callback(error, null);
                    };
                    const findPromoid = "SELECT promoid FROM promotions;";
                    dbConn.query(findPromoid, (error, results) => {
                        dbConn.end();
                        if(error) {
                            console.log(error)
                            return callback(error, null);
                        };
                        var output = results.slice(-1);
                        return callback(null, output);
                    });
                });
            };
        });
    },

    findPromo: function(promoid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var findAllpromo = 
                `
                SELECT * FROM promotions WHERE promoid = ?;
                `;
                dbConn.query(
                findAllpromo,
                [promoid], 
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

    findAllPromo: function(callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var findAllpromo = 
                `
                SELECT * FROM promotions;
                `;
                dbConn.query(
                findAllpromo, (error, results) => {
                    dbConn.end();
                    if(error) {
                       return callback(error, null);
                    };
                    return callback(null, results);
                });
            };
        });
    },

    deletePromo: function(promoid,callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var removePromo = "DELETE FROM promotions WHERE promoid = ?";
                dbConn.query(removePromo, [parseInt(promoid)], (error,results) => {
                    if (error) {
                        console.log(error);
                        return callback(error, null);
                    };
                    output = "{Message: Deletion Successful}";
                    return callback(null, output);
                });
            };
        });
    },

    updatePromotion: function(newPromotion, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            } else {
                var updatePromo = 
                `
                UPDATE promotions SET promoflightid = ?, promostart = ?, promoend = ?, discount = ? WHERE promoid = ?;
                `;
                dbConn.query(
                updatePromo,
                [newPromotion.promoflightid, newPromotion.promostart, newPromotion.promoend, newPromotion.discount, newPromotion.promoid],
                (error, results) => {
                    dbConn.end();
                    if(error) {
                        console.log(error)
                        return callback(error, null);
                    };
                    output = "{Message: Update Successful}";
                    return callback(null, output);
                });
            };
        });
    }
};

module.exports = (promotion);