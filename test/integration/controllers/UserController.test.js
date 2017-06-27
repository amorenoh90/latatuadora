var request = require('supertest'),
  assert = require('assert');

describe('UserController', function() {

  var mockuser={
        name: "Pepito",
        email: "blick@lick.com",
        password: "password",
        form: "user"
      }

    it("should logup a normal User", function (done) {
      request(sails.hooks.http.app)
      .post('/logup')
      .send(mockuser)
      .expect(function(res) {
        assert.notEqual(res.body, null);
      })
      .expect(200, done);
    });
    it("should login a normal User", function (done) {
      request(sails.hooks.http.app)
      .post('/login')
      .send(mockuser)
      .expect(function(res) {
        assert.notEqual(res.body.token, null);
        assert.equal(res.body.usertype, 2);
      })
      .expect(200, done);
    });
});