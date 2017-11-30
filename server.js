var express=require("express");
var app=express();
var path=require("path");
var session=require("express-session");
var bodyParser=require("body-parser");
app.use(session({secret: 'codingdojorocks'}));
app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static(path.join(__dirname, '/public/dist')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
require('./server/config/mongoose.js');
var routes_setter=require('./server/config/routes.js');
routes_setter(app);
app.listen(6789, function(){
    console.log("listening on port 6789");
});