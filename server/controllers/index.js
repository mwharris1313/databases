var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (req, res) {
      console.log('*********************');
      console.log('getAllMessages:',models.messages.get());
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('postMsg');
      models.messages.post(req.body.username, req.body.message, req.body.roomname);
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      console.log('postUsr', typeof req.body);
      models.users.post(req.body.username);
      res.end();

    }
  }
};


