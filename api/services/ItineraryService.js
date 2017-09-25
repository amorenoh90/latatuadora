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

        done(null, result);
      })
      .catch(function (err) {
        result.messages = [];
        result.errors.push(err);

        done(err, result);
      });
  },

  getAll: function (options, done) {
    var values = options.input || {},
      result = {
        messages: [],
        json_response: {},
        errors: []
      };

    Itinerary
      .find(values)
      .populateAll()
      .then(function (itineraries) {
        if (itineraries.length < 1) result.messages.push(messages.NO_ITINERARIES);

        result.json_response.itineraries = itineraries;

        done(null, result);
      })
      .catch(function (err) {
        result.messages = [];
        result.errors.push(err);

        done(err, result);
      });
  }
};
