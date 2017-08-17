var request = require('supertest'),
  assert = require('assert');

describe('FavoriteTattooController', function () {
  
  var mockuser = {
      form: "user",
      name: "usertest",
      email: "asdsdsddd@sdffdggz.com",
      password: "password"
    },
    mocktattoo = {};
  it("should logup a normal User (prerequisites)", function (done) {
    request(sails.hooks.http.app)
      .post('/logup')
      .send(mockuser)
      .expect(function (res) {
        mockuser.token = res.body.token;
        assert.notEqual(res.body, null);
      })
      .expect(200, done);
  });
  it("should create new Tatto (prerequisites)", function (done) {
    this.timeout(5000);
    Tattoo.create({name: 'tattootest'}).then(function (tattoo) {
      if (tattoo) {
        mocktattoo.tattooId = tattoo.id;
        done();
      }
    }).catch(function (err) {
      done(err);
    });
  });
  it("should add a new Favorite Tattoo", function (done) {
    request(sails.hooks.http.app)
      .post('/tattoofav')
      .set('X-Authorization', mockuser.token)
      .send(mocktattoo)
      .expect(function (res) {
        assert.equal(res.body.message, 'favorite is added');
      })
      .expect(200, done);
  });
  it("should consult favorites Tattos by User", function (done) {
    request(sails.hooks.http.app)
      .get('/tattoofav')
      .set('X-Authorization', mockuser.token)
      .expect(function (res) {
        assert.equal(res.body.length, 1);
        assert.equal(res.body[0].tattooId.id, mocktattoo.tattooId);
      })
      .expect(200, done);
  });
  it("should remove favorite Tattoo", function (done) {
    request(sails.hooks.http.app)
      .delete('/tattoofav')
      .set('X-Authorization', mockuser.token)
      .send(mocktattoo)
      .expect(function (res) {
        assert.equal(res.body.message, 'favorite is removed');
      })
      .expect(200, done);
  });
});
