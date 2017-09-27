var mocha = require('mocha'),
  assert = require('assert');

describe('StudioService', function () {
  it("should check getting studios", function (done) {
    StudioService
      .getAll({}, function (err, result) {
        // The following assertion will make sure there are values being returned properly and there are no errors. Respectively the first array entry represents something being returned by the service method and the second represents the error, then these values are compared with an array of the values expected from the first one.
        var values = [result.json_response.studios.length > 0, err];
        assert.deepEqual(values, [false, null]);
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
});
