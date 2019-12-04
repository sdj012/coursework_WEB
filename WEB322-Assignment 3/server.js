/********************************************************************************************* 
 * WEB322 – Assignment 03 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students. 
 * Name: Salley Jeong Student ID: 111894150 Date: February 15th 2019
 *
 * Online (Heroku) Link: https://cryptic-earth-40019.herokuapp.com/ 
 * *******************************************************************************************/

var fs = require('fs');
var express = require("express");
var app = express();
var path = require("path");
var dataservice = require('./data-service');
var multer=require("multer");
var bodyParser=require("body-parser");

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}
app.use(express.static('public'));

//A3 3.1 
app.use(bodyParser.urlencoded({extended:true}));

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
const upload = multer({ storage: storage });

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

// setup another route to listen on /about
app.get("/about", function(req,res){
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

//STEP3:TODO:add route to return a JSON formatted string 
//containing all of the employees within the employees.json file

app.get("/employees", (req,res)=>{

  switch(Object.keys(req.query)[0]){

  case "status":
    dataservice.getEmployeesByStatus(Object.values(req.query)[0])
    .then((data)=>res.json(data))
    .catch((err)=> res.send(err));
    break;

  case "department":
    dataservice.getEmployeesByDepartment(Object.values(req.query)[0])
    .then((data)=>res.json(data))
    .catch((err)=> res.send(err));
    break;

  case "manager":
    dataservice.getEmployeesByManager(Object.values(req.query)[0])
    .then((data)=>res.json(data))
    .catch((err)=> res.send(err));
    break;
  
  default:
    dataservice.getAllEmployees()
    .then((data)=>res.json(data))
    .catch((err)=> res.send(err));
  }     
});

//TODO:add route to return a JSON formatted string 
//containing all of the employees whose isManager property is set to true

app.get("/managers",(req,res)=>{
  dataservice.getManagers().then((data)=>res.json(data)
  ).catch(
    (err)=> res.send(err)
)});


//TODO:add route to return a JSON formatted string 
//containing all departments within the departments.json file

app.get("/departments",(req,res)=>{
  dataservice.getDepartments().then((data)=>res.json(data)
  ).catch(
    (err)=> res.send(err)
  )
});



//TODO:A3,1.2 

app.get("/employees/add",(req,res)=>{
  res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
});

app.get("/images/add",(req,res)=>{
  res.sendFile(path.join(__dirname, "/views/addImage.html"));
});

//TODO:Add Post Route
app.post("/images/add",upload.single('imageFile'),function(req,res,next){
  res.redirect('/images');
});

//TODO:A3 2.3

app.get("/images",(req,res)=>{
  var obj ={images:[]};
  fs.readdir('public/images/uploaded', function(err, data) {
    if(!err){
      for(var i=0;i<data.length;i++){
        obj.images.push(data[i]);
      }
      res.json(obj);
    }
  })
});

//TODO:A3 4.2
app.get("/employee/:eid",(req,res)=>{
  dataservice.getEmployeeByNum(req.params.eid)
  
  .then((data)=>res.json(data)
  ).catch(
    (err)=> res.send(err)
  )
  
});


//TODO:A3 3.2
app.post("/employees/add",(req,res)=>{
  dataservice.addEmployee(req.body)
  .then(
    res.redirect('/employees'))
  .catch(
    (err)=> res.send(err))
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