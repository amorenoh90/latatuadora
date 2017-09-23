var constants = require('../Constants.js'),
  messages = constants.messages;
module.exports = {
  add: function (options, done) {
    var values = options.input || {},
      result = {
        messages: [],
        errors: []
      };

    values.jobber = values.jobber || 0,
      values.client = values.client || 0,
      values.datetime = new Date(values.datetime) || new Date();

    Itinerary
      .create(values)
      .then(function () {
        result.messages.push(messages.ADDED_ITINERARY);
      })
      .catch(function (err) {
        result.messages = [];
        result.errors.push(err);
      })
      .then(function () {
        done(result);
      });
  }
};
