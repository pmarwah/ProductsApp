var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//opening connection with db

var db =  mongoose.connect('mongodb://localhost/employeeAPI'); //employeeAPI is the database we are connecting to.

var Employee = require('./models/employeeModel'); //ref. of table employee



var app = express();

var port = process.env.PORT || 3000;

//loading the middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

employeeRouter = require('./Routes/employeeRoutes')(Employee); //injecting the model


app.use('/api',employeeRouter);
app.get('/',function(req,res){
    res.send('Hello from the server!!!');
});

app.listen(port,function(){
    console.log("Running on port "+ port);
});