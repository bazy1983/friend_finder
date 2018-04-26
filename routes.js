var path = require("path")
var serverJSON = require("./server.js");
var bodyParser = require("body-parser");


module.exports = function (app){
  // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/index.html'));
  })
  
  app.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/survey.html'));
  })

  app.get('/character-guess', function (req, res) {
    res.sendFile(path.join(__dirname + '/pages/guess.html'));
  })


  //sending all users json to the client
  app.get('/api/friends', function (req, res) {
    res.send(serverJSON.person);
  })
  
  app.post("/api/friends", function (req, res) {
    console.log(req.body)
    let userScore = 0;
    //user score sumation
    for (let i = 0; i < req.body.scores.length; i++) {
      let score = parseInt(req.body.scores[i]);
      userScore += score;
    };
  
  let index = serverJSON.matchFriends(userScore);
  
    res.send(serverJSON.person[index])
    
   serverJSON.writejson(req.body) //write new user info
  }) //end of post request


  //Akinator routes can be found in akinatorApi.js file
}