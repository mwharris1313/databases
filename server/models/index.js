var db = require('../db');




module.exports = {
  messages: {
    get: function () {

      db.getField('messages', '*', "''", "''", function(results){
        console.log('*************************');
        console.log('GET ALL MESSAGES:', results);
      });


      console.log('messagesGet', this);
    }, // a function which produces all the messages

    post: function (username, message, roomname) {
      // username = db.escapeString(username);
      // message = db.escapeString(message);
      // roomname = db.escapeString(roomname);

      var roomId, userId;

      var qtf = function(str){
        return "'"+ str +"'";
      }


      // add room
      db.addValue('rooms','roomname',qtf(roomname), function(){ //

        console.log('completed add room');
        db.getField('rooms','room_id','roomname', qtf(roomname), function(results){
          roomId= results[0]['room_id'];
          console.log('ROOM ID:',roomId);
          //get user_id
          db.getField('users','user_id','username', qtf(username), function(results){
            userId = results[0]['user_id'];
            console.log('USER ID:',userId);
            //add message
            var temp = qtf(message)+','+userId+','+roomId;
            db.addValue('messages', 'msg_text,user_id,room_id', temp  , function(){
            });
          });
        });
      });
      console.log('messagesPost', this);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      console.log('usersGet', this);

    },
    post: function (username) {
      if(!db.initialized){
        db.initialize();
      }
      db.addValue('users', 'username', "'"+username+"'", function(){
        console.log('models, db.addValue() SUCCESS');
      });

    }
  }
};

