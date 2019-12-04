var fs = require('fs');
var employees=[];
var departments=[];

module.exports = {

initialize: function (){

    return new Promise (function(resolve, reject){

        fs.readFile('./data/employees.json', (err, data) => {

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
    }
)},

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

})}

};