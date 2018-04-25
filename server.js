var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs")

require("./routes")(app)
//reading friend json file
var personInServer;
fs.readFile(path.join(__dirname + '/friends.json'), 'utf8', function (err, data) {
  if (err) throw err;
  personInServer = JSON.parse(data)
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//to bring all static files
app.use(express.static(path.join(__dirname, 'pages')));





app.listen(process.env.PORT || 3000, function(){

  console.log("server is live")
})

// write user's information
function writejson(userReq) {
  personInServer.push(userReq);
  let myjson = JSON.stringify(personInServer)
  fs.writeFile(path.join(__dirname + '/friends.json'), myjson, function (err) {
    if (err) throw err;
    console.log("added new friend!")
  });
}

//find closest match to user's score
function matchFriends(userScore) {
  let closestScore = 50;
  let friendIndex;
  for (let i = 0; i < personInServer.length; i++) {
    let frinedScore = 0;
    for (let x = 0; x < personInServer[i].scores.length; x++) {
      let unitScore = parseInt(personInServer[i].scores[x]);
      frinedScore += unitScore;
    };

    let diff = Math.abs(userScore - frinedScore);

    if (diff < closestScore){
      closestScore = diff;
      friendIndex = i;
    }
  }
  return friendIndex;
}