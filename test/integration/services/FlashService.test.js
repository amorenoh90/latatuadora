var mocha = require('mocha'),
  assert = require('assert'),
  mocha_repeat = require('mocha-repeat');

var expected_values = [{
    amount: 1,
    flash: {
      publicate: true,
      style: 1,
      element: 1
    }
  },
  {
    amount: 2,
    flash: {
      publicate: true,
      style: 1,
      element: 2
    }
  },
  {
    amount: 2,
    flash: {
      publicate: true,
      style: 2,
      element: 1
    }
  },
  {
    amount: 1,
    flash: {
      publicate: true,
      style: 3,
      element: 4
    }
  }
];

mocha_repeat('FlashService', expected_values, function (expected_value) {
  it("should check getting flashes", function (done) {
    var test = async() => {
      var flash = await Flash
        .create(expected_value.flash);

      await FlashElement
        .create({
          flashId: flash.id,
          element: expected_value.flash.element
        });
      await FlashStyle
        .create({
          flashId: flash.id,
          style: expected_value.flash.style
        });

      FlashService
        .getAll({
          input: expected_value.flash
        }, function (err, result) {
          var actual_result = [err, result.json_response.flashes.length],
            expected_result = [undefined, expected_value.amount];

          assert.deepEqual(actual_result, expected_result);
          done();
        });
    };

    test();
  });
});
