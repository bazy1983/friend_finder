var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs")


//reading friend json file
var obj;
fs.readFile(path.join(__dirname + '/friends.json'), 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data)
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

//to bring all static files
app.use(express.static(path.join(__dirname, 'pages')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/index.html'));
  })
   
  app.listen(3000)
  console.log("server is alive")