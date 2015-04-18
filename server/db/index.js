var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

  var dbConnection;
  initialize();
  addUser('Dave');

  var initialize = function(){
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
        console.log('connected as id ' + dbConnection.threadId);
      }
    );
  };

  var addUser = function(username){
    var queryString = "SELECT * FROM users WHERE username = '" + username + "'";
    var queryArgs = [];

    dbConnection.query(queryString, queryArgs, function(err, results) {
      if (results.length === 0) {

        var queryString = "INSERT INTO users (username) VALUES ('" + username + "');";
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs);

      }
    });
  };




  // //console.log('dbConnection:', dbConnection);
  //    var tablename = "messages"; // TODO: fill this out

  //  Empty the db table before each test so that multiple tests
  //  * (or repeated runs of the tests) won't screw each other up:
  // dbConnection.query("truncate " + tablename, done);

