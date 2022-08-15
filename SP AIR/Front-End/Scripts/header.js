const baseUrl = "http://localhost:8081";
const token = localStorage.getItem("token");
const loggedInUserID = parseInt(localStorage.getItem("loggedInUserID"));
const currenturl = window.location.href;

if(token === null || isNaN(loggedInUserID)) {
    var returnhtml = '<a href="/login/" id="buttonfont">LOGIN</a>';
    $('#contact').append(returnhtml);
}else {
    var returnhtml = '<a href="/profile" id="buttonfont">PROFILE</a>';
    $('#contact').append(returnhtml);
}