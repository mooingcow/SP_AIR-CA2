//Admin Number: 2129088
//Name: Jedidiah Phua Shengjie
//Class: DISM/FT/2B/21


var express=require('express');


var app=express();

var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});

app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser);
app.use('/uploads', express.static('uploads'));



module.exports=app;