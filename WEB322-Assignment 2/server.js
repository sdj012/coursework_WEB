var fs = require('fs');
var express = require("express");
var app = express();
var path = require("path");
var dataservice = require('./data-service');

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('public'));

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
  dataservice.getAllEmployees().then((data)=>res.json(data)
  ).catch(
    (err)=> res.send(err)
)});

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
