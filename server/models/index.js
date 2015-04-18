var db = require('../db');




module.exports = {
  messages: {
    get: function () {
      console.log('messagesGet', this);
    }, // a function which produces all the messages
    post: function () {
      console.log('messagesPost', this);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      console.log('usersGet', this);

    },
    post: function () {
      console.log('usersPost', this);

    }
  }
};

