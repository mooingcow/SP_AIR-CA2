const express = require("express");
const app = express();
//const path = require('path')

//Reset Stylesheet
app.get("/resetcss", (req, res) => {
    res.sendFile("reset.css", { root: '../Stylesheets' });
});
//Header & Footer Stylesheet and Image
app.get("/headerfootercss", (req, res) => {
    res.sendFile("header_footer.css", { root: '../Stylesheets' });
});
app.get("/logoimage", (req, res) => {
    res.sendFile("sp_air-logo.png", { root: '../Images' });
});
//Header Script
app.get("/headerjs", (req, res) => {
    res.sendFile("header.js", { root: '../Scripts' });
});


//Login
app.get("/login", (req, res) => {
    res.sendFile("login.html", { root: '../HTML' });
});
app.get("/indexjs", (req, res) => {
    res.sendFile("index.js", { root: '../Scripts' });
});
app.get("/logincss", (req, res) => {
    res.sendFile("login.css", { root: '../Stylesheets' });
});
app.get("/loginimage", (req, res) => {
    res.sendFile("login-logo.png", { root: '../Images' });
});

//Index
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: '../HTML' });
});
app.get("/indexcss", (req, res) => {
    res.sendFile("index.css", { root: '../Stylesheets' });
});
app.get("/dropdownarrow", (req, res) => {
    res.sendFile("down-arrow.png", { root: '../Images' });
});
app.get("/searcharrow", (req, res) => {
    res.sendFile("searcharrow.png", { root: '../Images' });
});

//Promotions
app.get("/promotions", (req, res) => {
    res.sendFile("promotions.html", { root: '../HTML' });
});
app.get("/promotionscss", (req, res) => {
    res.sendFile("promotions.css", { root: '../Stylesheets' });
});

//Search
app.get("/searchresults", (req, res) => {
    res.sendFile("searchresults.html", { root: '../HTML' });
});
app.get("/searchresultscss", (req, res) => {
    res.sendFile("searchresults.css", { root: '../Stylesheets' });
});
app.get("/planeicon", (req, res) => {
    res.sendFile("planeicon.png", { root: '../Images' });
});
app.get("/dropdown", (req, res) => {
    res.sendFile("dropdownarrow.png", { root: '../Images' });
});

//Profile
app.get("/profile", (req, res) => {
    res.sendFile("profile.html", { root: '../HTML' });
});
app.get("/profilecss", (req, res) => {
    res.sendFile("profile.css", { root: '../Stylesheets' });
});
app.get("/profileimage", (req, res) => {
    res.sendFile("profileimage.jpg", { root: '../Images' });
});
app.get("/cross", (req, res) => {
    res.sendFile("cross.png", { root: '../Images' });
});

//Admin Dashboard
app.get("/admin", (req, res) => {
    res.sendFile("admin.html", { root: '../HTML' });
});
app.get("/admincss", (req, res) => {
    res.sendFile("admin.css", { root: '../Stylesheets' });
});
app.get("/airportimage", (req, res) => {
    res.sendFile("airport.png", { root: '../Images' });
});
app.get("/flightimage", (req, res) => {
    res.sendFile("flight.png", { root: '../Images' });
});
app.get("/promotionimage", (req, res) => {
    res.sendFile("promotion.png", { root: '../Images' });
});

//Admin Dashboard - Airports
app.get("/admin/airports", (req, res) => {
    res.sendFile("admin_airports.html", { root: '../HTML' });
});
app.get("/admin/airportscss", (req, res) => {
    res.sendFile("admin_airports.css", { root: '../Stylesheets' });
});
app.get("/editimage", (req, res) => {
    res.sendFile("edit.png", { root: '../Images' });
});
app.get("/plusimage", (req, res) => {
    res.sendFile("plus.png", { root: '../Images' });
});

//Admin Dashboard - Flights
app.get("/admin/flights", (req, res) => {
    res.sendFile("admin_flights.html", { root: '../HTML' });
});
app.get("/admin/flightscss", (req, res) => {
    res.sendFile("admin_flights.css", { root: '../Stylesheets' });
});

//Admin Dashboard - Promotions
app.get("/admin/promotions", (req, res) => {
    res.sendFile("admin_promotions.html", { root: '../HTML' });
});
app.get("/admin/promotionscss", (req, res) => {
    res.sendFile("admin_promotions.css", { root: '../Stylesheets' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Client server has started listening on port ${PORT}`);
});