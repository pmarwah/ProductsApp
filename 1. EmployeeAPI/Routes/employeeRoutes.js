var express = require('express');

var routes = function(Employee){
    var employeeRouter = express.Router();
    var employeeController = require('../Controllers/employeeController')(Employee);
    employeeRouter.route('/Employees')
        /*.post(function(req,res){
            var employee = new Employee(req.body);

            employee.save();
            res.status(201).send(employee); //201 for create record
        }) */
        .post(employeeController.post)
        .get(employeeController.get);

    //USING MIDDLEWARE - CREATING TO AVOID REPEATATION OF findById(). MIDDLEWARE INJECTS BETWEEN CALL AND ROUTE.
    //use() means - about to use middleware. We need it only for the route that has :employeeID

    employeeRouter.use('/Employees/:employeeId',function(req,res,next ){
        //next will pass on the info - what next is to be done. In this case we have one piece of middleware. If we had more middleware, it woule
        //move on to the next piece of middleware.
        Employee.findById(req.params.employeeId,function(err,employee){
            if(err)
                res.status(500).send(err);
            else if(employee) //if employee exists, we add it to request.
            {
                req.employee = employee;
                next(); //Instruction to the middleware, that now go to next
                //instruction.
            }
            else
            {
                // if employee not found - we return 404
                res.status(404).send('Employee not found');
            }

        });


    });
    employeeRouter.route('/Employees/:employeeId')
        .get(function(req,res){

            res.json(req.employee);

        })
        .put(function(req,res){

            req.employee.eno = req.body.eno;
            req.employee.ename = req.body.ename;
            req.employee.dept = req.body.dept;
            req.employee.hasResigned = req.body.hasResigned;
            req.employee.save(function(err){
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.json(req.employee);
                }

            });

        })
        .patch(function(req,res){
           /*if(req.employee.ename) {
               //if employee exists
           }*/
            if(req.body._id){
                delete req.body._id;
            }
            for(var p in req.body){
                req.employee[p] = req.body[p];
            }
            req.employee.save(function(err){
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.json(req.employee);
                }

            });
        })
        .delete(function(req,res){
            req.employee.remove(function(err){
                if(err){
                    res.status(500).send(err);
                }
                else
                {
                    res.status(204).send("Removed...");

                }
            });
        });
    return employeeRouter;
};

module.exports=routes;

