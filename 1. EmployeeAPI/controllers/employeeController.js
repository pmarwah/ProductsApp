var employeeController = function(Employee){
    var post = function(req,res){
        var employee = new Employee(req.body);

        if(!req.body.eno){
            res.status(400);
            res.send('Title is required');

        }
        else
        {
            employee.save();
            res.status(201);
            res.send(employee); //201 for create record
        }

    }

    var get = function(req,res){

        var query={};

        if(req.query.dept){
            query.dept = req.dept.query;
        }

        Employee.find(query,function(err,employees){
            if(err)
                res.status(500).send(err);
            else
                res.json(employees);
        });

    }
    return{
        post:post,
        get:get
    }
}

module.exports = employeeController;