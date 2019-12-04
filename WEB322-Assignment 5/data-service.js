
const Sequelize=require('sequelize')
// const Op = Sequelize.Op;

var sequelize=new Sequelize('d5ng4r21a4doda','natjxzxqwkeumc','a9bc4890b55816bdcaafe15539978899f2b95ce1a95d70833de143ca24f8e577',{ 
    host:'ec2-23-23-173-30.compute-1.amazonaws.com',
    dialect:'postgres',
    port:5432,
    dialectOptions:{
        ssl:true
    },
    operatorsAliases: false
});

//Create Data Models

var Employee=sequelize.define('Employee',{
    employeeNum: {
    type: Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
    },
    firstName: Sequelize.STRING,
    lastName:Sequelize.STRING,
    email:Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet:Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
})

var Department=sequelize.define('Department',{
    departmentId:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
})
module.exports = {

initialize: function (){
    return new Promise(function (resolve, reject) {

        sequelize.sync().then(function(){

            Employee.create({
                employeeNum: {
                    type: Sequelize.INTEGER,
                    primaryKey:true,
                    autoIncrement:true
                    },
                    firstName: Sequelize.STRING,
                    lastName:Sequelize.STRING,
                    email:Sequelize.STRING,
                    SSN: Sequelize.STRING,
                    addressStreet:Sequelize.STRING,
                    addressCity: Sequelize.STRING,
                    addressState: Sequelize.STRING,
                    addressPostal: Sequelize.STRING,
                    maritalStatus: Sequelize.STRING,
                    isManager: Sequelize.BOOLEAN,
                    employeeManagerNum: Sequelize.INTEGER,
                    status: Sequelize.STRING,
                    department: Sequelize.INTEGER,
                    hireDate: Sequelize.STRING
                })

        .then(function(){resolve("Success")})
        .catch(function(err){})
        resolve("Success")
        reject("unable to sync database")

        // .catch(reject("unable to sync database"))

            // resolve(console.log("Success"))
            // reject(console.log ("unable to sync database"))
          
        })  
        // .catch((function(err){}))

        // resolve(console.log("Success"))
        // reject(console.log ("unable to sync database"))
      
 
    })},

getAllEmployees: function (){
    return new Promise(function (resolve, reject) {

            Employee.findAll({
            attributes:['firstName','lastName'],
            })

            .then(function(data){
                var temp = [];
                for(var i=0;i<data.length;i++){
                    console.log(data[i].firstName+data[i].lastName)
                    temp.push(data[i]);
                }
                resolve(temp)
            })
            .catch(function(err){})
            .catch("no results returned")
            
        })
},

// getManagers: function (){
    // return new Promise(function (resolve, reject) {
        // reject();
    //    });

// },

getDepartments: function (){
        
     return new Promise(function (resolve, reject) {

        Department.findAll()

        .then(function(data){
            var temp = [];
            for(var i=0;i<data.length;i++){
                console.log(data[i].departmentId+data[i].departmentName);
                temp.push(data[i]);
            }
            resolve(temp);
        })  
        .catch(function(err){})
        .catch("no results returned")

        })

},

updateEmployee: function (employeeData){

    return new Promise(function (resolve, reject) {

        employeeData.isManager=(employeeData.isManager)? true:false

        for(var property in employeeData){
            if (employeeData.property=="")employeeData.property=null
        }
        
        Employee.update({
            firstName: employeeData.firstName,
            lastName:employeeData.lastName,
            email:employeeData.email,
            SSN: employeeData.SSN,
            addressStreet:employeeData.addressStreet,
            addressCity: employeeData.addressCity,
            addressState: employeeData.addressState,
            addressPostal: employeeData.addressPostal,
            maritalStatus: employeeData.maritalStatus,
            isManager: employeeData.isManager,
            employeeManagerNum: employeeData.employeeManagerNum,
            status: employeeData.status,
            department: employeeData.department,
            hireDate:employeeData.hireDate
        },{
            where:{
                employeeNum: employeeData.employeeNum
            }
        })

        .then(resolve(data))
        // .catch(function(err){})
        .catch("unable to sync the database")

}
.catch(function(err){})
.catch("unable to create employee")

)},

addEmployee: function(employeeData){
    return new Promise(function (resolve, reject) {

        employeeData.isManager=(employeeData.isManager)? true:false

        for(var property in employeeData){
            if (employeeData.property=="")employeeData.property=null
        }

            Employee.create({
                employeeNum: employeeData.employeeNum,
                firstName: employeeData.firstName,
                lastName:employeeData.lastName,
                email:employeeData.email,
                SSN: employeeData.SSN,
                addressStreet:employeeData.addressStreet,
                addressCity: employeeData.addressCity,
                addressState: employeeData.addressState,
                addressPostal: employeeData.addressPostal,
                maritalStatus: employeeData.maritalStatus,
                isManager: employeeData.isManager,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department,
                hireDate:employeeData.hireDate,
            })

            .then(resolve(console.log("Success")))
        })
        .catch(function(err){})
        .catch("unable to create employee")

    },

getEmployeesByStatus: function (status){

    return new Promise(function (resolve, reject) {
        Employee.findAll({
            attributes:['firstName','lastName'],
            where: {
                status: status
            }
        })
        
        .then(function(data){

            for(var i=0;i<data.length;i++){
                console.log(data[i].firstName+data[i].lastName)
            }
        })

        .catch(function(err){})
        .catch("no results returned")

    
})},

getEmployeesByDepartment: function (department){
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            attributes:['firstName','lastName'],
            where: {
                department: department
            }
        })
            .then(function(data){
            console.log("All Employees")
            for(var i=0;i<data.length;i++){
                console.log(data[i].firstName+data[i].lastName)
            }
            resolve(data)

        })
            .catch(function(err){})
            .catch("no results returned")

})},

getEmployeesByManager: function (manager){
    return new Promise(function (resolve, reject) {

        Employee.findAll({
            attributes:['firstName','lastName'],
            where: {
                employeeManagerNum:manager
            }
        })
        
        .then(function(data){
            console.log("All Employees")
            for(var i=0;i<data.length;i++){
                console.log(data[i].firstName+data[i].lastName)
            }
            resolve(data)
        })

        .catch(function(err){})
        .catch("no results returned")

        // reject();

})},

deleteEmployeeByNum(empNum){

    return new Promise(function (resolve, reject) {

    Employee.destroy({
        where: { employeeNum: empNum} // only remove user with id == 3
        })

    .then(resolve("destroyed"))
    .catch(function(err){})
    .catch("unable to delete")


// .catch(function(err){})
// .catch(reject("unable to delete"))

})},


getEmployeeByNum: function (num){
    return new Promise(function (resolve, reject) {

        Employee.findAll({
            attributes:['firstName','lastName'],
            where: {
                employeeNum:num
            }
        })
        
        .then(function(data){

            for(var i=0;i<data.length;i++){
                console.log(data[i].firstName+data[i].lastName)

            resolve(data)

            }
        })
        
        .catch(function(err){})
        .catch("no results returned")
        
})},


updateDepartment: function (deoartmentData){

    return new Promise(function (resolve, reject) {

        for(var property in departmentData){
            if (departmentData.property=="")departmentData.property=null
        }
        
        Department.update({
            departmentId: departmentData.departmentId,
            departmentName: departmentData.departmentName,
        
        },{
            where:{
                departmentId: departmentData.departmentId
            }
        })

    .then(resolve("Update Successful"))
    .catch(function(err){})
    .catch("Unable to update department data")

})},

addDepartment:function(departmentData){

return new Promise(function (resolve, reject) {

    for(var property in departmentData){
        if (departmentData.property=="")departmentData.property=null
    }

        Department.create({
        departmentId: departmentData.departmentId,
        departmentName:departmentData.departmentName,
        })

        .then(resolve("Success"))
        .catch(function(err){})
        .catch("unable to create department")
    })

},

getDepartmentById: function (id){
    return new Promise(function (resolve, reject) {

        Department.findAll({
            attributes:['departmentName'],
            where: {
                departmentId:id
            }
        })

        .then(function(data){
            var temp = [];
            for(var i=0;i<data.length;i++){
                console.log(data[i].departmentId+data[i].departmentName);
                temp.push(data[i]);
            }
            resolve(temp);
        })  

        .catch(function(err){})
        .catch("no results returned")
        
     })
    
},










}
