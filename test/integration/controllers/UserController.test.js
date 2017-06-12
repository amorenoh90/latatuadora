var request = require('supertest'),
  assert = require('assert');

describe('UserController', function() {

  var mockuser={
        name: "Pepito",
        email: "blick@blck.com",
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
    it("should login a user", function (done) {
      request(sails.hooks.http.app)
      .post('/login')
      .send(mockuser)
      .expect(function (res) {
        assert.notEqual(res.body, null);
      })
      .expect(200, done)
    })
});