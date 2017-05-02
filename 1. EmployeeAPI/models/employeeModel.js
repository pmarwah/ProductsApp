var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var employeeModel = new Schema({
    eno:{
        type:String
    },
    ename:{type:String},
    dept:{type:String},
    hasResigned:{type:Boolean,default:false}

});

module.exports = mongoose.model('Employee',employeeModel);

/*
 {
 "eno":"1001",
 "ename":"Nirmal Joshi",
 "dept":"EDP",
 "hasResigned":false
 }
 {eno:"1001",ename:"Nirmal Joshi",dept:"EDP",hasResigned:false}
 {"eno":"1001","ename":"Nirmal Joshi","dept":"EDP","hasResigned":false}
 */