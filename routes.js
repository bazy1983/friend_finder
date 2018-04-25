var path = require("path")

module.exports = function (app){
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
    //user score sumation
    for (let i = 0; i < req.body.scores.length; i++) {
      let score = parseInt(req.body.scores[i]);
      userScore += score;
    };
  
  let index = matchFriends(userScore);
  
    res.send(personInServer[index])
    
   writejson(req.body) //write new user info
  }) //end of post request

}