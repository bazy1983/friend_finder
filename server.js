var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs")


//reading friend json file
var personInServer;
fs.readFile(path.join(__dirname + '/friends.json'), 'utf8', function (err, data) {
  if (err) throw err;
  personInServer = JSON.parse(data)
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

app.get('/survey', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/survey.html'));
})

app.get('/api/friends', function (req, res) {
  res.send(personInServer);
})

app.post("/api/friends", function (req, res) {

  let userScore = 0;
  for (let i = 0; i<req.body["scores[]"].length; i++){
    let score = parseInt(req.body["scores[]"][i]);
    userScore += score;
  };

  res.send("my score" + userScore)

  //writejson(req.body) //write new user info
})
app.listen(3000)
console.log("server is alive")


function writejson(userReq) {
  personInServer.push(userReq);
  let myjson = JSON.stringify(personInServer)
  fs.writeFile(path.join(__dirname + '/friends.json'), myjson, function (err) {
    if (err) throw err;
    console.log("added new friend!")
  });
}