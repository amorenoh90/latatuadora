/**
 * Created by edwin on 30/05/17.
 */
var request = require('supertest'),
  assert = require('assert');

describe('CalculatorController', function () {
  var calcValue1 = {
    minAmount: 800,
    maxAmount: 1000,
    styleId: 1,
    bodypartId: 1,
    minRange: 20,
    maxRange: 25
  };
  var calcValue2 = {
    minAmount: 1000,
    maxAmount: 1200,
    styleId: 1,
    bodypartId: 1,
    minRange: 20,
    maxRange: 25
  };
  var calcValue3 = {
    minAmount: 600,
    maxAmount: 800,
    styleId: 1,
    bodypartId: 1,
    minRange: 15,
    maxRange: 20
  };
  var calc = [
    calcValue1,
    calcValue2,
    calcValue3
  ];
  
  before(function () {
    Style.findOrCreate({name: 'Religioso'}).exec(function (err, style) {
      BodyPart.findOrCreate({name: 'Brazo'}).exec(function (err, bodyPart) {
        calcValue1.bodypartId = bodyPart.id;
        calcValue1.styleId = style.id;
        
        calcValue2.bodypartId = bodyPart.id;
        calcValue2.styleId = style.id;
        
        calcValue3.bodypartId = bodyPart.id;
        calcValue3.styleId = style.id;
      });
    });
  });
  
  it("should add new Calculator", function (done) {
    request(sails.hooks.http.app)
      .post('/calculator')
      .send(calc)
      .expect(function (res) {
        assert.equal(res.body[0].minAmount, calc[0].minAmount);
        assert.equal(res.body[0].maxAmount, calc[0].maxAmount);
        assert.equal(res.body[0].styleId, calc[0].styleId);
        assert.equal(res.body[0].bodypartId, calc[0].bodypartId);
        assert.equal(res.body[1].minAmount, calc[1].minAmount);
        assert.equal(res.body[1].maxAmount, calc[1].maxAmount);
        assert.equal(res.body[1].styleId, calc[1].styleId);
        assert.equal(res.body[1].bodypartId, calc[1].bodypartId);
        assert.equal(res.body[2].minAmount, calc[2].minAmount);
        assert.equal(res.body[2].maxAmount, calc[2].maxAmount);
        assert.equal(res.body[2].styleId, calc[2].styleId);
        assert.equal(res.body[2].bodypartId, calc[2].bodypartId);
      })
      .expect(201, done);
  });
});
