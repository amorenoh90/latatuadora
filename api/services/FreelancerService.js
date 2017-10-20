var constants = require('../Constants.js'),
  messages = constants.messages;

const radius = 0.5;

function getPropertyArray(array, property) {
  var result = [];

  for (var i = 0; i < array.length; i++) {
    var element = array[i];

    result.push(element[property]);
  }

  return result;
}

function calculateDistance(x0, x, y0, y) {
  var distance = Math.pow(x - x0, 2) + Math.pow(y - y0, 2);
  distance = Math.sqrt(distance);

  return distance;
}

function filterAddresses(addresses, x0, y0) {
  var filtered_addresses = [];
  for (var i = 0; i < addresses.length; i++) {
    var address = addresses[i],
      distance = calculateDistance(x0, address.long, y0, address.lat);

    if (distance <= radius) filtered_addresses.push(address.id);
  }

  return filtered_addresses;
}

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
  },

  getNearby: function (options, done) {
    var input = options.input || {},
      result = {
        messages: [],
        json_response: {},
        errors: []
      },
      long = input.long || 0,
      lat = input.lat || 0;

    Address
      .find()
      .sort('createdAt ASC')
      .then(function (addresses) {
        if (addresses.length < 1) {

          done(null, messages.NO_USERS_UNDER_CRITERIA);
        } else {
          addresses = filterAddresses(addresses, long, lat);

          User
            .find({
              addressId: addresses
            })
            .sort('createdAt ASC')
            .then(function (jobbers) {
              result.json_response.jobbers = jobbers;

              done(null, result);
            })
            .catch(function (err) {
              done(err, null);
            });
        }
      })
      .catch(function (err) {
        done(err, null);
      });
  },

  getPaid: function (done) {
    var result = {
        messages: [],
        json_response: {},
        errors: []
      },
      first_date = new Date();

    var doQuery = async() => {
      try {
        var jobbers = await Freelancer
          .find()
          .where({
            membershipExp: {
              '>': first_date
            }
          })
          .sort('createdAt DESC');

        if (jobbers.length < 1) {
          result.messages.push(messages.NO_USERS_UNDER_CRITERIA);
          result.json_response.paid_jobbers = [];
        } else {
          jobbers = getPropertyArray(jobbers, "userId");

          var payments = await Payments
            .find({
              user: jobbers,
              status: constants.payment.paid
            });

          if (payments.length < 1) {
            result.messages.push(messages.NO_USERS_UNDER_CRITERIA);
            result.json_response.paid_jobbers = [];
          } else {
            payments = getPropertyArray(payments, "user");

            var paid_jobbers = await Studio
              .find({
                userId: payments
              })
              .populateAll()
              .sort('createdAt ASC');

            result.json_response.paid_jobbers = paid_jobbers;
          }
        }
      } catch (error) {
        result.messages = [];
        console.log(error);
        result.errors.push(err);
      } finally {
        done(result.errors.pop(), result);
      }
    };

    doQuery();
  }
};
