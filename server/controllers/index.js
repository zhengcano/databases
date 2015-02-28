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

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var message = '';
      req.on('data', function(data){
        message += data;
      });
      req.on('end', function(){
        connection.connect();
        var user, room;
        connection.query('SELECT username FROM users WHERE username =' + message.username, function(err, result){
          if (err){
            connection.query('INSERT INTO users SET ?', {username: message.username}, function(err, result){
              user = result.insertId;
            });
            //add user
            //get userid
          } else {
            connection.query()
            // dont add and get existing id
          }
        });
        connection.query('', {}, function(){});
        connection.query('INSERT INTO messages SET ?', {message: message.text}, function(){});


      });
      //Take data from the request
      //  With the data:
      //    Add the message to the message table
      //
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {

    },
    post: function (req, res) {
      connection.query('SELECT username FROM users WHERE ?', {username: req.body.username}, function(err, result){
        if (err){
          connection.query('INSERT INTO users SET ?', {username: req.body.username}, function(err, result){
          });
          //add user
          //get userid
        } else {
          // dont add and get existing id
          console.log('name exists');
        }
      });
    }
  }
};

