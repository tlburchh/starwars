var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var PORT = 8081;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var characters = [
  {
    routeName: 'yoda',
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: 'darthmaul',
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  },
  {
    routeName: 'obiwankenobi',
    name: "Obi Wan Kenobi",
    role: "Jedi Knight",
    age: 60,
    forcePoints: 1350
  }
];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
  });

app.get("/api/characters/:chosen?", function(req, res) {
  var chosen = req.params.chosen;
  
  if(chosen) {
    for (var i = 0; i < characters.length; i++) {
      if(chosen === characters[i].routeName) {
        return res.json(characters[i]);
      }
    }
  }
  else {
    return res.json(characters);
  }

  res.send("No character found");
});

app.post("/api/characters", function(req, res) {
    var newCharacter = req.body;

    newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
    console.log(newCharacter);

    characters.push(newCharacter);

    res.json(newCharacter);
})
app.listen(PORT, function() {
  console.log("Server started listening on http://localhost:" + PORT);
});