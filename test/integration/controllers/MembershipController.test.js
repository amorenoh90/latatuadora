var request = require('supertest'),
  assert = require('assert');

describe('MembershipController', function () {
  
  var mockmembership = {
    amount: 300.00,
    userType: 3,
    description: 'mock plan description',
    name: "mock plan name ",
    recurrentId: 1
  };
  // TODO, find for the logic in other branches .... it's gone
  it("should add a new Membership", function (done) {
    //this.timeout(10000);
    request(sails.hooks.http.app)
      .post('/memberships')
      .send(mockmembership)
      .expect(function (res) {
        assert.notEqual(res.body.conekta, null);
        assert.notEqual(res.body.paypal, null);
        assert.equal(res.body.amount, mockmembership.amount);
        assert.equal(res.body.name, mockmembership.name);
        assert.equal(res.body.description, mockmembership.description);
      })
      .expect(201, done);
  });
});
