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
      }, function (result) {
        assert.equal(result.messages.length > 0, true);
        assert.equal(result.errors.length < 1, true);
        done();
      });
  });
});
