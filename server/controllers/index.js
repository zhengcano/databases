var models = require('../models');
var bluebird = require('bluebird');
var mysql = require('mysql');
var connection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

module.exports = {
  messages: {
    get: function (req, res) {
      connection.query('SELECT users.username, messages.text, messages.messageid, messages.roomname FROM messages, users WHERE messages.userid = users.userid', function(err, result){
        console.log(result);
        res.writeHead(200);
        res.end(JSON.stringify({results: result}));
      });



    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log(req.body);
      connection.query('SELECT userid FROM users WHERE username = ' + mysql.escape(req.body.username), function(err, result){
        if (result.length === 0){
          connection.query('INSERT INTO users SET ?', {username: req.body.username}, function(err, result){
            connection.query('INSERT INTO messages SET ?', {text: req.body.text, userid: result.insertId, roomname: req.body.roomname}, function(err, result){
            });
          });
        } else {
          connection.query('INSERT INTO messages SET ?', {text: req.body.text, userid: result[0].userid, roomname: req.body.roomname}, function(err, result){
          });
        }
      });
      res.writeHead(201);
      res.end();
      //Take data from the request
      //  With the data:
      //    Add the message to the message table
      //
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('I am getting users');

    },
    post: function (req, res) {
      connection.query('SELECT username FROM users WHERE username = ' + mysql.escape(req.body.username), function(err, result){
        if (result.length === 0){
          connection.query('INSERT INTO users SET ?', {username: req.body.username}, function(err, result){
          });
        }
      });

      res.writeHead(201);
      res.end();
    }
  }
};

