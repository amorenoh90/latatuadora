var mocha = require('mocha'),
  assert = require('assert'),
  constants = require('../../../api/Constants.js');

describe('StudioService', function () {
  it("should check getting studios", function (done) {
    StudioService
      .getAll({}, function (err, result) {
        // The following assertion will make sure there are values being returned properly and there are no errors. Respectively the first array entry represents something being returned by the service method and the second represents the error, then these values are compared with an array of the values expected from the first one.
        var values = [result.json_response.studios.length > 0, err];
        assert.deepEqual(values, [true, null]);
        done();
      });
  });

  it("should check getting nearby studios", function (done) {
    // This will add addresses and studios which will be employed in the test
    var addresses = [],
      studios = [];

    for (var i = 0; i < 10; i++) {
      var address = {},
        studio = {};

      studio.name = "Studio " + i,
        studio.addressId = i + 8;

      if (i % 2 == 0) {
        address.long = i / 100 + 19;
        address.lat = -i / 100 - 99;
      } else {
        address.long = i + 35;
        address.lat = i + 120;
      }

      addresses.push(address);
      studios.push(studio);
    }

    Address
      .createEach(addresses)
      .then(function (added_addresses) {
        Studio
          .createEach(studios)
          .then(function (added_studios) {
            StudioService
              .getNearby({
                input: {
                  long: 19.4668599,
                  lat: -99.0910841
                }
              }, function (err, result) {
                if (err) {
                  console.log(err);
                  assert.equal(1, 2);
                  done();
                } else {
                  // This will make sure there are no errors and there are only five nearby studios
                  var values = [result.json_response.studios.length, err];
                  assert.deepEqual(values, [5, null]);
                  done();
                }
              });
          });
      });
  });

  it("should check getting paid studios", function (done) {
    // This will add addresses and studios which will be employed in the test
    var payments = [],
      studios = [],
      users = [];

    for (var i = 0; i < 10; i++) {
      var payment = {},
        studio = {},
        user = {};

      studio.name = "Studio " + i,
        user.name = studio.name,
        user.email = "studio" + i + "@gmail.com";

      if (i % 3 == 0) {
        payment.status = constants.payment.pending;
      } else {
        payment.status = constants.payment.paid;
      }

      if (i % 2 == 0) {
        studio.membershipExp = new Date(),
          studio.membershipExp = new Date(studio.membershipExp.getFullYear(), studio.membershipExp.getMonth() + 3, studio.membershipExp.getDate());
      } else {
        studio.membershipExp = new Date(),
          studio.membershipExp = new Date(studio.membershipExp.getFullYear(), studio.membershipExp.getMonth() - 3, studio.membershipExp.getDate());
      }

      payments.push(payment);
      studios.push(studio);
      users.push(user);
    }

    var addPrerequisites = async(cb) => {
      users = await User
        .createEach(users);

      for (var i = 0; i < studios.length; i++) {
        studios[i].userId = users[i].id;
        payments[i].user = users[i].id;
      }

      studios = await Studio
        .createEach(studios),
        payments = await Payments
        .createEach(payments);

      cb();

      return "done";
    };

    addPrerequisites(function () {
      StudioService
        .getPaid(function (err, result) {
          if (err) {
            assert.equal(1, 2);
            done();
          } else {
            var values = [result.json_response.paid_jobbers.length, err];
            assert.deepEqual(values, [3, undefined]);
            done();
          }
        });
    });
  });
});
