var fs = require('fs');
var employees=[];
var departments=[];

module.exports = {

initialize: function (){

    return new Promise (function(resolve, reject){

    fs.readFile('data/employees.json', (err, data) => {

        if (err) reject("unable to read file");
        else {
            employees = JSON.parse(data);
        }


    });

    fs.readFile('data/departments.json', (err, data) => {

        if (err) reject("unable to read file");
        else {
            departments = JSON.parse(data);
        }

    });
    resolve("success");

})},

getAllEmployees: function (){
    
    return new Promise (function(resolve, reject){

        if (employees.length==0){
        
        reject("no results returned");
        
        }else resolve(employees);

})},

getManagers: function (){
    
    return new Promise (function(resolve,reject){

    arrcpy=[];

    for(var i =0; i<employees.length;i++)

        if (employees[i].isManager ==1){

        arrcpy.push(employees[i]);
        }

    if (arrcpy.length==0) reject("no results returned");
    else resolve(arrcpy);

})},

getDepartments: function (){

    return new Promise (function (resolve,reject){
    
    if(departments.length==0) reject("no results returned");
    else resolve(departments);

})},

addEmployee: function (employeeData){

    return new Promise(function (resolve,reject){
    
    if (employeeData.isManager===undefined) employeeData.isManager=false;
    else employeeData.isManager=true;

    var empnum=employees.length+1;
    employeeData.employeeNum=empnum;

    employees.push(employeeData);

    resolve(employees);
    reject("error!");

    })},

getEmployeesByStatus: function (status){
    
    return new Promise(function(resolve,reject){
    
    tempArr=[];

    for(var i=0;i<employees.length;i++){
        if(employees[i].status==status)
        tempArr.push(employees[i])
    }

    if(tempArr.length>0) resolve(tempArr)
    else reject("no results returned")

    })},

getEmployeesByDepartment: function (department){
    
    return new Promise(function(resolve,reject){
    
    tempArr=[];

    for(var i=0;i<employees.length;i++){
        if(employees[i].department==parseInt(department))
        tempArr.push(employees[i])
    }

    if(tempArr.length>0) resolve(tempArr)
        else reject("no results returned")

    })},

getEmployeesByManager: function (manager){
    
    return new Promise(function(resolve,reject){
    
    tempArr=[];

    for(var i=0;i<employees.length;i++){
        if(employees[i].employeeManagerNum==parseInt(manager))
        tempArr.push(employees[i])
    }
    
    if(tempArr.length>0) resolve(tempArr)
        else reject("no results returned")
    })},


getEmployeeByNum: function (num){
    
    return new Promise(function(resolve,reject){
    
    for(var i=0;i<employees.length;i++){
    if(employees[i].employeeNum==parseInt(num))resolve(employees[i])
    }
    
    reject("no results returned")
    })},

updateEmployee: function (employeeData){
    return new Promise(function(resolve,reject){
    employeeData.employeeNum=parseInt(employeeData.employeeNum)
    employeeData.department=parseInt(employeeData.department)

    if(employees.length == 0) reject("no results returned");
    else{
        for(var i = 0 ; i < employees.length ; i++){
            if(employees[i].employeeNum == employeeData.employeeNum){
                employees[i] = employeeData;
                resolve(employees);
            }
        }
    }
    }
    )}};