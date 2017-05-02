var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var employeeModel = new Schema({
    eno:{
        type:Number
    },
    ename:{type:String},
    dept:{type:String},
    hasResigned:{type:Boolean,default:false}
});

module.exports = mongoose.model('Employee',employeeModel);
