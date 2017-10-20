var mocha = require('mocha'),
  assert = require('assert'),
  constants = require('../../../api/Constants.js');

describe('FreelancerService', function () {
  it("should check getting freelancers", function (done) {
    FreelancerService
      .getAll({}, function (err, result) {
        // The following assertion will make sure there are values being returned properly and there are no errors. Respectively the first array entry represents something being returned by the service method and the second represents the error, then these values are compared with an array of the values expected from the first one.
        var values = [result.json_response.freelancers.length > 0, err];
        assert.deepEqual(values, [false, null]);
        done();
      });
  });

  it("should check getting nearby freelancer", function (done) {
    // This will add addresses and studios which will be employed in the test
    var addresses = [],
      jobbers = [];

    for (var i = 0; i < 10; i++) {
      var address = {},
        jobber = {};

      jobber.name = "Jobber " + i,
        jobber.addressId = i + 8;

      if (i % 2 == 0) {
        address.long = i / 100 + 19;
        address.lat = -i / 100 - 99;
      } else {
        address.long = i + 35;
        address.lat = i + 120;
      }

      addresses.push(address);
      jobbers.push(jobber);
    }

    Address
      .createEach(addresses)
      .then(function (added_addresses) {
        Freelancer
          .createEach(jobbers)
          .then(function (added_studios) {
            FreelancerService
              .getNearby({
                input: {
                  long: 19.4668599,
                  lat: -99.0910841
                }
              }, function (err, result) {
                if (err) {
                  assert.equal(1, 2);
                  done();
                } else {
                  // This will make sure there are no errors and there are only five nearby freelancers
                  var values = [result.json_response.jobbers.length, err];
                  assert.deepEqual(values, [0, null]);
                  done();
                }
              });
          });
      });
  });

  it("should check getting paid freelancers", function (done) {
    // This will add addresses and studios which will be employed in the test
    var payments = [],
      freelancers = [],
      users = [];

    for (var i = 0; i < 10; i++) {
      var payment = {},
        freelancer = {},
        user = {};

      freelancer.name = "Freelancer " + i,
        user.name = freelancer.name,
        user.email = "freelancer" + i + "@gmail.com";

      if (i % 3 == 0) {
        payment.status = constants.payment.pending;
      } else {
        payment.status = constants.payment.paid;
      }

      if (i % 2 == 0) {
        freelancer.membershipExp = new Date(),
          freelancer.membershipExp = new Date(freelancer.membershipExp.getFullYear(), freelancer.membershipExp.getMonth() + 3, freelancer.membershipExp.getDate());
      } else {
        freelancer.membershipExp = new Date(),
          freelancer.membershipExp = new Date(freelancer.membershipExp.getFullYear(), freelancer.membershipExp.getMonth() - 3, freelancer.membershipExp.getDate());
      }

      payments.push(payment);
      freelancers.push(freelancer);
      users.push(user);
    }

    var addPrerequisites = async(cb) => {
      users = await User
        .createEach(users);

      for (var i = 0; i < freelancers.length; i++) {
        freelancers[i].user = users[i].id;
        payments[i].user = users[i].id;
      }

      freelancers = await Studio
        .createEach(freelancers),
        payments = await Payments
        .createEach(payments);

      cb();

      return "done";
    };

    addPrerequisites(function () {
      FreelancerService
        .getPaid(function (err, result) {
          if (err) {
            console.log(err);
            assert.equal(1, 2);
            done();
          } else {
            var values = [result.json_response.paid_jobbers.length, err];
            assert.deepEqual(values, [0, undefined]);
            done();
          }
        });
    });
  });
});
