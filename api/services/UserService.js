var constants = require('../Constants.js'),
  messages = constants.messages;
module.exports = {
  get: function (options, done) {
    var values = options.input || {};

    var doQuery = async() => {
      try {
        var user = (await User
            .find({
              email: values.email
            })
            .populateAll())[0],
          errors = null;

        if (!user) {
          user = messages.NO_SUCH_USER;
        } else {
          user.studio = (await Studio
              .find({
                userId: user.id
              })
              .populateAll())[0] || null,
            user.freelancer = (await Freelancer
              .find({
                user: user.id
              })
              .populateAll())[0] || null;
        }
      } catch (error) {
        errors = error;
      } finally {
        done(errors, user);
      }
    };

    doQuery();
  }
};
