var mocha = require('mocha'),
  assert = require('assert');

var schedule = {
  "jobber": 1,
  "client": 1,
  "datetime": "2015-03-25T12:00:00Z"
};

describe('ItineraryService', function () {
  it("should add a Itinerary", function (done) {
    ItineraryService
      .add({
        input: schedule
      }, function (err, result) {
        assert.equal(err, null);
        assert.notEqual(result, null);
        done();
      });
  });

  it("should check getting Itineraries", function (done) {
    ItineraryService
      .getAll({}, function (err, result) {
        assert.equal(result.json_response.itineraries.length > 0, true);
        assert.deepEqual(result.errors, []);
        done();
      });
  });
});
