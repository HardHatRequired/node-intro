// This is where our server code will be
var express = require('express'),
  _ = require('lodash'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  app = express();

//Build in MIDDLEWARE
app.use(express.static('client'));
app.use(morgan('combine')); //for error tracking
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var users = [
  {
    name: "Billy Bean",
    intro: "hey I like baseball",
    age: "32",
    gender: "male"
  }
];

var id = '0';

var updateId = function(req, res, next) {
  if(!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

app.get('/users', function(req, res) {
  res.json(users);
});

app.put('/users/:id', function(req, res) {
    var update = req.body;
    if (update.id) {
        delete update.id
    }
    
    var user = _.findIndex(users, {id: req.params.id});
    if (!users[user]) {
        res.send();
    } else {
        var updateduser = _.assign(users[user], update);
        res.json(updateduser);
    }
});

app.post('/users', function(req, res) {
  var user = req.body;
  console.log(user);
  users.push(user);
  console.log(users);
  res.json(users);
});

app.listen(3000);
