/********************************************************************************************* 
 * WEB322 – Assignment 05
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students. 
 * Name: Salley Jeong Student ID: 111894150 Date: March 22nd 2019
 *
 * Online (Heroku) Link: https://cryptic-earth-40019.herokuapp.com/ 
 * *******************************************************************************************/

var fs = require('fs');
var express = require("express");
var app = express();
const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    navLink: function (url, options) {
      return '<li' +
        ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
        '><a href="' + url + '">' + options.fn(this) + '</a></li>';
    },
    equal: function (lvalue, rvalue, options) {
      if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
      if (lvalue != rvalue) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    }
  }
}));

app.set('view engine', '.hbs');
var path = require("path");
var dataservice = require('./data-service');
var multer = require("multer");
var bodyParser = require("body-parser");

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}
app.use(express.static('public'));

//A3 3.1 
app.use(bodyParser.urlencoded({
  extended: true
}));

const storage = multer.diskStorage({
  destination: "public/images/uploaded",
  filename: function (req, file, cb) {
    // we write the filename as the current date down to the millisecond
    // in a large web service this would possibly cause a problem if two people
    // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
    // this is a simple example.
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// tell multer to use the diskStorage function for naming files instead of the default.
const upload = multer({
  storage: storage
});

app.use(function (req, res, next) {
  let route = req.baseUrl + req.path;
  app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
  next();
});

// render home view
app.get("/", function (req, res) {
  res.render('home', {});
});

// setup another route to listen on /about
app.get("/about", function (req, res) {
  res.render('about', {});
});

//STEP3:TODO:add route to return a JSON formatted string 
//containing all of the employees within the employees.json file

app.get("/employees", (req, res) => {

  switch (Object.keys(req.query)[0]) {

    case "status":
      dataservice.getEmployeesByStatus(Object.values(req.query)[0])
        .then((data) => res.json(data))
        .catch((err) => res.send(err));
      break;

    case "department":
      dataservice.getEmployeesByDepartment(Object.values(req.query)[0])
        .then((data) => res.json(data))
        .catch((err) => res.send(err));
      break;

    case "manager":
      dataservice.getEmployeesByManager(Object.values(req.query)[0])
        .then((data) => res.json(data))
        .catch((err) => res.send(err));
      break;

    default:
      dataservice.getAllEmployees()

        .then((data) => res.render("employees",{employees:data}))
        .catch((err) => res.send(err))
  }});

//TODO:add route to return a JSON formatted string 
//containing all of the employees whose isManager property is set to true

app.get("/managers", (req, res) => {
  dataservice.getManagers().then((data) => res.json(data)).catch(
    (err) => res.send(err)
  )
});


//TODO:add route to return a JSON formatted string 
//containing all departments within the departments.json file

app.get("/departments", (req, res) => {
  dataservice.getDepartments()
  
    .then((data) => res.render("departments",{departments:data}))
    .catch((err) => res.send(err)
  )
  });
  
  app.post("/departments/update", (req, res) => {
    dataservice.updateDepartment(req.body)
    .then(
      res.redirect('/departments'))
    .catch(
      (err) => res.send(err))
   });
  

  app.get("/departments/:eid", (req, res) => {
    dataservice.getDepartmentById(req.params.eid)
  
      .then((data) => res.render("departments",{departments:data}))
      // .catch((err) => res.render("departments",{message:"no result"})

      .catch((err) =>res.status(404).send("Department Not Found"));
  });

app.post("/departments/add", (req, res) => {
    dataservice.addDepartment(req.body)
      .then((data) => res.redirect('/department'))
      .catch((err) => res.send(err))
  });

//TODO:A3,1.2 

app.get("/employees/add", (req, res) => {
  res.render('addEmployee', {layout: "add_employee_layout", template: "add-employee-layout"});
});

app.get("/images/add", (req, res) => {
  res.render('addImage', {layout: "add_image_layout", template: "add-image-layout"});
});

app.get("/departments/add", (req, res) => {
  res.render('addDepartment', {layout: "add_department_layout", template: "add-department-layout"})

});


//TODO:Add Post Route
app.post("/images/add", upload.single('imageFile'), function (req, res, next) {
  res.redirect('/images');
});

//TODO:A3 2.3

app.get("/images", (req, res) => {
  var obj = {
    images: []
  };
  fs.readdir('public/images/uploaded', function (err, data) {
    if (!err) {
      for (var i = 0; i < data.length; i++) {
        obj.images.push(data[i]);
      }
      res.render("images", {
        pics: obj.images
      });
    }
  })
});

//TODO:A3 4.2
// app.get("/employee/:eid", (req, res) => {
//   dataservice.getEmployeeByNum(req.params.eid)

//     .then((data) => res.render("employee",{employee:data})).catch(
//       (err) => res.render("employee",{message:"no result"})
//     )
// });

app.get("/employee/:empNum", (req, res) => {
  // initialize an empty object to store the values
  let viewData = {};
  dataService.getEmployeeByNum(req.params.empNum).then((data) => {
  if (data) {
  viewData.employee = data; //store employee data in the "viewData" object as "employee"
  } else {
  viewData.employee = null; // set employee to null if none were returned
  }
  }).catch(() => {
  viewData.employee = null; // set employee to null if there was an error
  }).then(dataService.getDepartments)
  .then((data) => {
  viewData.departments = data; // store department data in the "viewData" object as "departments"
  // loop through viewData.departments and once we have found the departmentId that matches
  // the employee's "department" value, add a "selected" property to the matching
  // viewData.departments object
  for (let i = 0; i < viewData.departments.length; i++) {
  if (viewData.departments[i].departmentId == viewData.employee.department) {
  viewData.departments[i].selected = true;
  }
  }
  }).catch(() => {
  viewData.departments = []; // set departments to empty if there was an error
  }).then(() => {
  if (viewData.employee == null) { // if no employee - return an error
  res.status(404).send("Employee Not Found");
  } else {
  res.render("employee", { viewData: viewData }); // render the "employee" view
  }
  });
 });


app.get("/employees/delete/:empNum", (req, res) => {

dataservice.deleteEmployeeByNum(req.params.empNum)
.then(

  res.redirect('/employees'))
.catch(
  (err) => res.status(500).send("Unable to Remove Employee / Employee not found"))



});


//TODO:A3 3.2
app.post("/employees/add", (req, res) => {
  dataservice.addEmployee(req.body)
    .then(
      res.redirect('/employees'))
    .catch(
      (err) => res.send(err))

  dataservice.getDepartments(req.body)
    .then((data)=>res.render("addEmployee", {departments: data}))
    .catch((err) => res.render("addEmployee", {departments: []}))
});

app.post("/employee/update", (req, res) => {
  dataservice.updateEmployee(req.body)
  .then(
    res.redirect('/employees'))
  .catch(
    (err) => res.send(err))
 });

//TODO:no matching route

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// setup http server to listen on HTTP_PORT

dataservice.initialize().then(
  (done) => app.listen(HTTP_PORT, onHttpStart)
).catch(
  (err) => res.send(err)
);