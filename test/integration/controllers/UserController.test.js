var request = require('supertest'),
  assert = require('assert');

describe('UserController', function() {

  var mockuser={
        name: "Pepito",
        email: "blick@blick.com",
        password: "password",
        form: "user"
      }
    it("should logup a normal User", function (done) {
      request(sails.hooks.http.app)
      .post('/logup')
      .send(mockuser)
      .expect(function(res) {
        mockuser.token= res.body.token;
        assert.notEqual(res.body, null);
      })
      .expect(200, done);
    });
    it("should find favs", function (done) {
      request(sails.hooks.http.app)
      .get('/favs')
      .set('Authorization', mockuser.token)
      .expect(function (res) {
        var test = [];
        assert.equal(res.body.tattoos[0], test[0]);
        assert.equal(res.body.flashes[0], test[0]);
      })
      .expect(200, done);
    })
    it("should login a normal User", function (done) {
      request(sails.hooks.http.app)
      .post('/login')
      .send(mockuser)
      .expect(function (res) {
        assert.notEqual(res.body, null);
      })
      .expect(200, done)
    })
});