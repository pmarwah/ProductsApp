var should = require('should'),
sinon = require('sinon'); //we dont need mocha as it runs inside gulp-mocha framework

describe('Employee Controller Test:',function(){
    describe('Post',function(){
        it('should not allow an empty eno',function(){
                var Employee = function(employee){
                    this.save=function(){}
                }
                var req = {
                    body:{
                        eno:'101'
                    }
                }
                var res = {
                    status:sinon.spy(),
                        send:sinon.spy()
                }

                var employeeController = require('../controllers/employeeController')(Employee);
                employeeController.post(req,res);
                res.status.calledWith(400).should.equal(true,'Bad status' + res.status.args[0][0]); //mean bad request
                res.send.calledWith('Eno is required').should.equal(true)
            })
    })

});