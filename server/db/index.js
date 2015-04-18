var mysql = require('mysql');
// Promise = require('bluebird');
// var mysql = Promise.promisifyAll(require('mysql'));

// Promise.promisifyAll(require("mysql/lib/Connection").prototype);
// Promise.promisifyAll(require("mysql/lib/Pool").prototype);

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

  var test = function(){
    console.log('test');
  };

  var dbConnection;
  var initialized =  false;

  exports.initialize = function(){
    console.log('Running initialize function');
    dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
    });
    dbConnection.connect(
      function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('conected as id ' + dbConnection.threadId);
      }
    );
    initialized = true;
  };


  exports.getField = function(table,field,lookupfield,lookupvalue,cb){
    var queryString = "SELECT "+field+" FROM "+ table + " WHERE "+ lookupfield +" = "+ lookupvalue + ";";
    var queryArgs = [];
    console.log('GET FIELD QUERY',queryString);
    dbConnection.query(queryString, queryArgs, function(err,results){
      cb(results);
    });
  };


  exports.addValue = function(table,field,value,cb){
    var callback = function(results) {
      if (results.length === 0) {
        var queryString = "INSERT INTO "+table+" ("+field+") VALUES (" + value + ");";
        console.log('ADD VALUE QUERY',queryString);

        var queryArgs = [];
        dbConnection.query(queryString, queryArgs,function(err,results){
          cb(results);
        });
      } else{
        cb(results);
      }
    };
    if(field.indexOf(',')>0){
      callback([]);
    }else{
      exports.getField(table,field,field,value,function(results){
        callback(results);
      });
    }
  };

  exports.escapeString = function (str){
    return mysql.escape(str);
  };

  // exports.addMessage = function(user, message, room, timeStamp){

  // user_id int NOT NULL,
  // room_id int NOT NULL,
  // msg_text varchar(255),
  // time_stamp datetime,




  //   var queryString = "INSERT INTO messages (user_id, room_id, msg_text) VALUES ();"  user, ;
  //   var queryArgs = [];
  //   dbConnection.query(queryString, queryArgs, function(err, results) {
  //     var queryString = "INSERT INTO users (username) VALUES ('" + username + "');";
  //     var queryArgs = [];
  //     dbConnection.query(queryString, queryArgs,function(err,results){
  //     });
  //   });
  // };




  // //console.log('dbConnection:', dbConnection);
  //    var tablename = "messages"; // TODO: fill this out

  //  Empty the db table before each test so that multiple tests
  //  * (or repeated runs of the tests) won't screw each other up:
  // dbConnection.query("truncate " + tablename, done);

