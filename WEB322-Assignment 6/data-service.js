const Sequelize = require('sequelize');

var sequelize = new Sequelize('d5ng4r21a4doda','natjxzxqwkeumc','a9bc4890b55816bdcaafe15539978899f2b95ce1a95d70833de143ca24f8e577',{ 
    host:'ec2-23-23-173-30.compute-1.amazonaws.com',
    dialect:'postgres',
    port:5432,
    dialectOptions:{
        ssl:true
    },
    operatorsAliases: false
});

// Define a "Project" model (http://docs.sequelizejs.com/variable/index.html#static-variable-DataTypes)

var Employee = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true, // use "employeeNum" as a primary key
        autoIncrement: true // automatically increment the value
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
});

// Define a "Department" model

var Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true, // use "departmentId" as a primary key
        autoIncrement: true // automatically increment the value
    },
    departmentName: Sequelize.STRING
});

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then( () => {
            resolve();
        }).catch(()=>{
            reject("unable to sync the database");
        });
    });
}

module.exports.getAllEmployees = function(){
    return new Promise(function (resolve, reject) {
        Employee.findAll().then(function (data) {
            resolve(data);
        }).catch((err) => {
            reject("query returned 0 results");
        });
    });
}

module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {

        employeeData.isManager = (employeeData.isManager) ? true : false;

        for (var prop in employeeData) {
            if(employeeData[prop] == '')
                employeeData[prop] = null;
        }

        Employee.create(employeeData).then(() => {
            resolve();
        }).catch((err)=>{
            console.log(err);
            reject("unable to create employee");
        });

    });

};

module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                employeeNum: num
            }
        }).then(function (data) {
            resolve(data[0]);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                status: status
            }
        }).then(function (data) {
            resolve(data);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};


module.exports.getEmployeesByDepartment = function (department) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                department: department
            }
        }).then(function (data) {
            resolve(data);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.getEmployeesByManager = function (manager) {
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: {
                employeeManagerNum: manager
            }
        }).then(function (data) {
            resolve(data);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};


module.exports.getDepartments = function(){
    return new Promise(function (resolve, reject) {
        Department.findAll().then(function (data) {
            resolve(data);
        }).catch((err) => {
            reject("query returned 0 results");
        });
    });
}


module.exports.updateEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {

        employeeData.isManager = (employeeData.isManager) ? true : false;

        for (var prop in employeeData) {
            if (employeeData[prop] == '')
                employeeData[prop] = null;
        }

        Employee.update(employeeData, {
            where: { employeeNum: employeeData.employeeNum } 
        }).then(() => {
            resolve();
        }).catch((e) => {
            reject("unable to update employee");
        });
    });
};

module.exports.addDepartment = function (departmentData) {
    return new Promise(function (resolve, reject) {

        for (var prop in departmentData) {
            if(departmentData[prop] == '')
                departmentData[prop] = null;
        }

        Department.create(departmentData).then(() => {
            resolve();
        }).catch((e)=>{
            reject("unable to create department");
        });

    });
};

module.exports.updateDepartment = function (departmentData) {
    return new Promise(function (resolve, reject) {

        for (var prop in departmentData) {
            if (departmentData[prop] == '')
                departmentData[prop] = null;
        }

        Department.update(departmentData, {
            where: { departmentId: departmentData.departmentId } 
        }).then(() => {
            resolve();
        }).catch((e) => {
            reject("unable to update department");
        });
    });

};

module.exports.getDepartmentById = function (id) {
    return new Promise(function (resolve, reject) {
        Department.findAll({
            where: {
                departmentId: id
            }
        }).then(function (data) {
            resolve(data[0]);
        }).catch(() => {
            reject("query returned 0 results");
        });
    });
};

module.exports.deleteEmployeeByNum = function(empNum){
    return new Promise(function (resolve, reject) {
        Employee.destroy({
            where: {
                employeeNum: empNum
            }
        }).then(function () {
            resolve();
        }).catch((err) => {
            reject("unable to delete employee");
        });
    });
}