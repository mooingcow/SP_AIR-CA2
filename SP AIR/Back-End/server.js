//Admin Number: 2129088
//Name: Jedidiah Phua Shengjie
//Class: DISM/FT/2B/21


//MODELS
var app = require('./controller/app.js');
var airports = require('./model/airports.js');
var bookings = require('./model/bookings.js');
var db = require('./model/databaseConfig.js');
var flights = require('./model/flights.js');
var promotions = require('./model/promotions.js');
var transfers = require('./model/transfers.js');
var user = require('./model/users.js');

var cors = require('cors');
app.use(cors());

const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config.js"); 
const isLoggedInMiddleware = require("./auth/isLoggedInMiddleware");

//MULTER - IMAGE UPLOAD
var multer = require('multer');
var storage = multer.diskStorage({
    //store uploaded image in uploads folder
    destination: function(req, file, callback){
        callback(null, 'uploads');
    },
    //assign upload image new filename
    filename: function(req, file, callback){
        var originaldate = new Date().toISOString();
        var newdate = originaldate.replace(/:/gi, '-');
        callback(null, newdate + file.originalname);
    }
});
//only permit jpeg or png files
var fileFilter = (req, file, callback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        callback(null, true);
    } else{
        callback(null, false);
    };
};
//only permit files that are 1 MB or less
var upload = multer({
    storage: storage, 
    limits:{
        fileSize: 1024 * 1024
    },
    fileFilter: fileFilter
});

//SERVER INITIALISATION
var port = 8081;
var server = app.listen(port,function(){
    console.log("App hosted at localhost:"+port); 
});


//ENDPOINT 1 - ADD NEW USER
app.post('/users', function(req, res) {
    var UserName = req.body.username;
    var Email = req.body.email;
    var Contact = req.body.contact;
    var Password = req.body.password;
    var Role = req.body.role;
    var Profile = req.body.profile_pic_url;
    var newUser = {UserName,Email,Contact,Password,Role,Profile};
    user.addUser(newUser, (error, results) => {
        if (!error) {
            user.findAll((err, result) => {
                if (!err) {
                    for(var i = 0; i < result.length; i++){
                        if(result[i].username == UserName){
                            var userid = result[i].userid;
                            break
                        };
                    };

                    var listingImage = "uploads\\default.png";

                    var dbConn = db.getConnection();
                    dbConn.connect(function (err) {
                        if (err) {
                            console.log(err);
                            return(err);
                        } else {
                            var insertImage =
                            `
                            INSERT INTO images (userid, imagepath)
                            VALUES (?, ?);
                            `;
                            dbConn.query(
                            insertImage,
                            [userid, listingImage],
                            (error, results) => {
                                if (error) {
                                    res.status(500).send({"Result":"Internal Error"});
                                    return;
                                };
                                var findImageid = "SELECT imageid FROM images;";
                                dbConn.query(findImageid, (error, results) => {
                                    dbConn.end();
                                    if(error) {
                                        res.status(500).send({"Result":"Internal Error"});
                                        return;
                                    };
                                    var output = results.slice(-1);
                                    res.status(201).send(output);
                                    return;
                                });
                            });
                        };
                    });
                } else {
                    res.status(500).send({"Result":"Internal Error"});
                };
            }); 
        } else {
            if (error.code == 'ER_DUP_ENTRY') {
                res.status(422).send("{Unprocessable Entity}");            
            } else {
                res.status(500).send({"Result":"Internal Error"});
            };
        };
    });
});

//ENDPOINT 2 - GET ALL USERS
app.get('/users', function (req, res) {
    user.findAll((err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        };
    });    
});

//ENDPOINT 3 - GET ONE USER (BASED ON USER ID)
app.get('/users/:userid', function (req, res) {
    var userid = req.params.userid;

    user.findOne(userid, (err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        };
    });    
});

//ENDPOINT 4 - UPDATE ONE USER (BASED ON USER ID)
app.put('/users/:userid', function(req, res) {
    var userid = req.params.userid;

    var UserName = req.body.username;
    var Email = req.body.email;
    var Contact = req.body.contact;
    var Password = req.body.password;
    var Role = req.body.role;
    var Profile = req.body.profile_pic_url;
    var newUser = {UserName,Email,Contact,Password,Role,Profile,userid};
    user.updateUser(newUser, (error, results) => {
        if (!error) {
            res.status(204).send();
        } else {
            if (error.code == 'ER_DUP_ENTRY') {
                res.status(422).send("{Unprocessable Entity}");            
            } else {
                res.status(500).send({"Result":"Internal Error"});
            };
        };
    });
});

//ENDPOINT 5 - ADD NEW AIRPORT
app.post('/airport', function(req, res) {
    var AirportName = req.body.airportname;
    var Country = req.body.country;
    var Description = req.body.description;
    var newAirport = {AirportName,Country,Description};
    airports.addAirport(newAirport, (error, results) => {
        if (!error) {
            res.status(204).send();
        } else {
            if (error.code == 'ER_DUP_ENTRY') {
                res.status(422).send("{Unprocessable Entity}");            
            } else {
                res.status(500).send({"Result":"Internal Error"});
            }
        }
    });
});

//ENDPOINT 5.1 - GET ONE AIRPORTS
app.get('/airport/:airportid', function (req, res) {
    var airportid = req.params.airportid;

    airports.findOneAirport(airportid, (err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        }
    });    
});

//ENDPOINT 6 - GET ALL AIRPORTS
app.get('/airport', function (req, res) {
    airports.findAll((err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        }
    });    
});

//ENDPOINT 6.1 - UPDATE ONE AIRPORT (BASED ON AIRPORT ID)
app.put('/airport/:airportid', function(req, res) {
    var airportid = req.params.airportid;

    var AirportName = req.body.airportname;
    var Country = req.body.country;
    var Description = req.body.description;
    var newAirport = {AirportName,Country,Description,airportid};
    airports.updateAirport(newAirport, (error, results) => {
        if (!error) {
            res.status(204).send();
        } else {
            if (error.code == 'ER_DUP_ENTRY') {
                res.status(422).send("{Unprocessable Entity}");            
            } else {
                res.status(500).send({"Result":"Internal Error"});
            };
        };
    });
});

//ENDPOINT 6.2 - DELETE AIRPORT
app.delete('/airport/:airportid', function(req, res) {
    var airportid = req.params.airportid;
    airports.deleteAirport(airportid, (error, results) => {
        if (!error) {
            res.status(201).send(results);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        };
    });
});

//ENDPOINT 7 - ADD NEW FLIGHT
app.post('/flight', function(req, res) {
    var code = req.body.flightCode;
    var aircraft = req.body.aircraft;
    var origin = req.body.originAirport;
    var destination = req.body.destinationAirport;
    var date = req.body.embarkDate;
    var duration = req.body.travelTime;
    var price = req.body.price;
    var newFlight = {code,aircraft,origin,destination,date,duration,price};
    flights.addFlight(newFlight, (error, results) => {
        if (!error) {
            res.status(201).send(results);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        };
    });
});

//ENDPOINT 7.1 - UPDATE ONE FLIGHT (BASED ON FLIGHT ID)
app.put('/flight/:flightid', function(req, res) {
    var flightid = req.params.flightid;

    var from = req.body.from;
    var to = req.body.to;
    var description = req.body.description;
    var embarkDate = req.body.embarkDate;
    var traveltime = req.body.traveltime;
    var flightcode = req.body.flightcode;
    var aircraft = req.body.aircraft;
    var price = req.body.price;
    var newFlight = {from,to,description,embarkDate,traveltime,flightcode,aircraft,price,flightid};
    
    flights.updateFlight(newFlight, (error, results) => {
        if (!error) {
            res.status(204).send();
        } else {
            if (error.code == 'ER_DUP_ENTRY') {
                res.status(422).send("{Unprocessable Entity}");            
            } else {
                res.status(500).send({"Result":"Internal Error"});
            };
        };
    });
});

//ENDPOINT 8 - GET FLIGHTS FROM ORIGIN TO DESTINATION
app.get('/flightDirect/:originAirportid/:destinationAirportid', function (req, res) {
    var originAirportid = req.params.originAirportid;
    var destinationAirportid = req.params.destinationAirportid;
    var flightid = {originAirportid,destinationAirportid};
    flights.findFlight(flightid, (error, results) =>{
        if (!error) {
            res.status(200).send(results);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        };
    });  
});

//ENDPOINT 8.1 - GET FLIGHTS BASED ON FLIGHT ID
app.get('/flight/:flightid', function (req, res) {
    var flightid = req.params.flightid;
    flights.findOneFlight(flightid, (error, results) =>{
        if (!error) {
            res.status(200).send(results);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        };
    });  
});

//ENDPOINT 8.2 - GET ALL FLIGHTS
app.get('/flight', function (req, res) {
    flights.findAllFlights((error, results) =>{
        if (!error) {
            res.status(200).send(results);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        };
    });  
});

//ENDPOINT 9 - ADD NEW BOOKING
app.post('/booking/:userid/:flightid', function(req, res) {
    var userid = req.params.userid;
    var flightid = req.params.flightid;

    var username = req.body.name;
    var passport = req.body.passport;
    var nationality = req.body.nationality;
    var age = req.body.age;
    var newBooking = {userid,flightid,username,passport,nationality,age};
    
    bookings.addBooking(newBooking, (error, results) => {
        if (!error) {
            res.status(201).send(results);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        };
    });
});

//ENDPOINT 10 - DELETE FLIGHT AND BOOKINGS
app.delete('/flight/:id', function(req, res) {
    var id = req.params.id;

    flights.deleteFlight(id, (error, results) => {
        if (!error) {
            res.status(201).send(results);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        };
    });
});

//ENDPOINT 11 - RETRIEVES DATA OF TRANSFER FLIGHTS
app.get('/transfer/flight/:originAirportId/:destinationAirportId', function(req, res) {
    var origin = req.params.originAirportId;
    var destination = req.params.destinationAirportId;
    var airportids = {origin,destination};

    //read transfers table
    transfers.findTranfer(airportids, (error, results) => {
        if (!error) {
            var transferinfo = JSON.stringify(results);
            transferinfo = transferinfo.slice(1, transferinfo.length-1);
            try {
                var transferinfodict = JSON.parse(transferinfo);
            } catch (err) {
            };
            var transferinforesults = {
                "firstFlightId":'', 
                "secondFlightId":'', 
                "flightCode1":'',
                "flightCode2":'',
                "aircraft1":'',
                "aircraft2":'',
                "originAirport":'',
                "transferAirport":'',
                "destinationAirport":'',
                "Total Price":''
            }           
            
            var flight1originAirportid = transferinfodict.originAirportid;
            var flight1destinationAirportid = transferinfodict.transferAirportid;
            var flight2originAirportid = flight1destinationAirportid;
            var flight2destinationAirportid = transferinfodict.destinationAirportid;
            
            //flight 1
            var originAirportid = flight1originAirportid;
            var destinationAirportid = flight1destinationAirportid;
            var flightid = {originAirportid,destinationAirportid};
            
            flights.findFlight(flightid, (error, results) =>{
                if (!error) {
                    var flight1info = JSON.stringify(results);
                    flight1info = flight1info.slice(1, flight1info.length-1);
                    try {
                        var flight1infodict = JSON.parse(flight1info);
                    } catch (err) {
                    };

                    //flight 2
                    var originAirportid = flight2originAirportid;
                    var destinationAirportid = flight2destinationAirportid;
                    var flightid = {originAirportid,destinationAirportid};

                    flights.findFlight(flightid, (error, results) =>{
                        if (!error) {
                            var flight2info = JSON.stringify(results);
                            flight2info = flight2info.slice(1, flight2info.length-1);
                            try {
                                var flight2infodict = JSON.parse(flight2info);
                            } catch (err) {
                            };
                            
                            //airports
                            airports.findAll((err, result) => {
                                if (!err) {
                                    var airports = JSON.stringify(result);
                                    airports = airports.slice(1, airports.length-1);
                                    airports = airports.split(',');
                                    
                                    var counter = 0;
                                    var airportlist = [];
                                    while(counter < airports.length/3){
                                        airportlist.push(airports[counter*3+1]);
                                        counter += 1;
                                    };
                                    
                                    var airportnewlist = [];
                                    for( var i = 0; i < airportlist.length; i++) {
                                        airportnewlist.push(airportlist[i].split(':'));
                                    };

                                    //add into transferinforesults
                                    transferinforesults.firstFlightId = flight1infodict.flightid;
                                    transferinforesults.secondFlightId = flight2infodict.flightid;
                                    transferinforesults.flightCode1 = flight1infodict.flightCode;
                                    transferinforesults.flightCode2 = flight2infodict.flightCode;
                                    transferinforesults.aircraft1 = flight1infodict.aircraft;
                                    transferinforesults.aircraft2 = flight2infodict.aircraft;
                                    transferinforesults.originAirport = airportnewlist[flight1infodict.originAirport-1][1].slice(1, airportnewlist[flight1infodict.originAirport-1][1].length-1);
                                    transferinforesults.transferAirport = airportnewlist[flight1infodict.destinationAirport-1][1].slice(1, airportnewlist[flight1infodict.destinationAirport-1][1].length-1);
                                    transferinforesults.destinationAirport = airportnewlist[flight2infodict.destinationAirport-1][1].slice(1, airportnewlist[flight2infodict.destinationAirport-1][1].length-1);
                                    transferinforesults['Total Price'] = parseInt(flight1infodict.price) + parseInt(flight2infodict.price);

                                    res.status(201).send(transferinforesults);

                                } else{
                                    res.status(500).send({"Result":"Internal Error"});
                                };
                            });    
                        } else{
                            res.status(500).send({"Result":"Internal Error"});
                        };
                    });
                } else{
                    res.status(500).send({"Result":"Internal Error"});
                };
            });            
        } else{
            res.status(500).send({"Result":"Internal Error"});
        };
    }); 
});

//ENDPOINT 12 - ADD PROMOTION
app.post('/promotions', function(req, res) {
    var promoflightid = req.body.promoflightid;
    var promostart = req.body.promostart;
    var promoend = req.body.promoend;
    var discount = req.body.discount;
    var newPromotion = {promoflightid, promostart, promoend, discount};
    promotions.addPromotion(newPromotion, (error, results) => {
        if (!error) {
            res.status(201).send(results);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        };
    });
});

//ENDPOINT 13 - GET ONE PROMOTION (BASED ON PROMOID)
app.get('/promotions/:promoid', function (req, res) {
    var promoid = req.params.promoid;
    
    promotions.findPromo(promoid, (error, results) =>{
        if (!error) {
            res.status(200).send(results);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        };
    });  
});

//ENDPOINT 13.1 - GET ALL PROMOTIONS
app.get('/promotion/', function (req, res) {
    promotions.findAllPromo((error, results) =>{
        if (!error) {
            res.status(200).send(results);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        };
    });  
});

//ENDPOINT 13.2 - UPDATE ONE PROMOTION
app.put('/promotions/:promoid', function (req, res) {
    var promoid = req.params.promoid;

    var promoflightid = req.body.promoflightid;
    var promostart = req.body.promostart;
    var promoend = req.body.promoend;
    var discount = req.body.discount;
    var newPromotion = {promoflightid, promostart, promoend, discount, promoid};

    promotions.updatePromotion(newPromotion, (error, results) =>{
        if (!error) {
            res.status(200).send(results);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        };
    })
});


//ENDPOINT 14 - DELETE PROMOTION
app.delete('/promotions/:promoid', function(req, res) {
    var promoid = req.params.promoid;

    promotions.deletePromo(promoid, (error, results) => {
        if (!error) {
            res.status(201).send(results);
        } else {
            res.status(500).send({"Result":"Internal Error"});
        };
    });
});

//ENDPOINT 15 - UPLOAD IMAGE
app.put('/profilepicture/:userid', upload.single('profilePicture'), function(req, res) {
    var userid = req.params.userid
    var listingImage = req.file.path;

    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            console.log(err);
            return(err);
        } else {
            var insertImage =
            `
            UPDATE images 
            SET 
                imagepath = ?    
            WHERE userid = ?;
            `;
            dbConn.query(
            insertImage,
            [listingImage, userid],
            (error, results) => {
                if (error) {
                    res.status(500).send({"Result":"Internal Error"});
                    return;
                };
                var findImageid = "SELECT imageid FROM images;";
                dbConn.query(findImageid, (error, results) => {
                    dbConn.end();
                    if(error) {
                        res.status(500).send({"Result":"Internal Error"});
                        return;
                    };
                    var output = results.slice(-1);
                    res.status(201).send(output);
                    return;
                });
            });
        };
    });
});



//ENDPOINT 16 - GET IMAGE BASED ON USERID
app.get('/profilepicture/:userid', function (req, res) {
    var userid = req.params.userid;

    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
        if (err) {
            console.log(err);
            return err;
        } else {
            var findProfilePic = 
            `
            SELECT * FROM images WHERE userid = ?;
            `;
            dbConn.query(
            findProfilePic,
            [userid], 
            (error, results) => {
                dbConn.end();
                if(error) {
                    res.status(500).send({"Result":"Internal Error"});
                    return; 
                };
                res.status(200).send(results);
                return ;
            });
        };
    });
});

//ENDPOINT 17
app.post("/login/", (req, res) => {
    user.verify(req.body.username, req.body.password, (error, user) => {
        if (error) {
            res.status(500).send();
            return;
        }
        if (user === null) {
            res.status(401).send();
            return;
        }
        const payload = { user_id: user.userid };
        jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" }, (error, token) => {
            if (error) {
                console.log(error);
                res.status(401).send();
                return;
            } 
            res.status(200).send({token: token, user_id: user.userid, role: user.role});
        })
    });
});