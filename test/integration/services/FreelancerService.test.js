var mocha = require('mocha'),
  assert = require('assert');

describe('FreelancerService', function () {
  it("should check getting studios", function (done) {
    FreelancerService
      .getAll({}, function (err, result) {
        // The following assertion will make sure there are values being returned properly and there are no errors. Respectively the first array entry represents something being returned by the service method and the second represents the error, then these values are compared with an array of the values expected from the first one.
        var values = [result.json_response.freelancers.length > 0, err];
        assert.deepEqual(values, [false, null]);
        done();
      });
  });
});
