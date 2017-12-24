var express = require('express');
var router = require('./routes/routes.js');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var app = express();
 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:false}));

var promise = mongoose.connect('mongodb://stalintouch:test123@ds129166.mlab.com:29166/expenses',{ useMongoClient: true })
promise.then(function(db){
  console.log("connected to database")
}, function(err){
  console.log("error in connecting")
}
)

app.use('/', router);
 
module.exports =app;
