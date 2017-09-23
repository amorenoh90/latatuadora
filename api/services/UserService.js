var constants = require('../Constants.js'),
  messages = constants.messages;
module.exports = {
  get: function (options, done) {
    var values = options.input || {};

    User
      .find({
        email: values.email
      })
      .then(function (user) {
        user = user[0];

        if (!user) {
          user = messages.NO_SUCH_USER;
        } else {
          user = user;
        }

        done(null, user);
      })
      .catch(function (err) {
        done(err, null);
      });
  }
};
