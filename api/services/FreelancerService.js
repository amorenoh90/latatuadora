var constants = require('../Constants.js'),
  messages = constants.messages;
module.exports = {
  getAll: function (options, done) {
    var values = options.input || {},
      result = {
        messages: [],
        json_response: {},
        errors: []
      },
      first_date = values.first_date || new Date(0),
      last_date = values.last_date || new Date(2500, 0);

    Freelancer
      .find()
      .where({
        membershipExp: {
          '>=': first_date,
          '<=': last_date
        }
      })
      .sort('createdAt DESC')
      .populateAll()
      .then(function (freelancers) {
        if (freelancers.length < 1) result.messages.push(messages.NO_USERS_UNDER_CRITERIA);

        result.json_response.freelancers = freelancers;

        done(null, result);
      })
      .catch(function (err) {
        result.messages = [];
        result.errors.push(err);

        done(err, result);
      });
  }
};
