var request = require('supertest'),
  assert = require('assert');

describe('FavoriteTattooController', function() {

  var mockuser = {
        form: "user",
        name: "usertest",
        email: "asdsdsddd@sdfvffdggz.com",
        password: "password"
      },
      mocktattoo = {};
    it("should logup a normal User and create a Tatto (prerequisites)", function (done) {
      request(sails.hooks.http.app)
      .post('/logup')
      .send(mockuser)
      .expect(function(res) {
        mockuser.token = res.body.token;
        assert.notEqual(res.body, null);
        Tattoo.create({name:'tattootest'}).exec(function (err, tattoo){
          if (err) { done(err); }
          else{
            mocktattoo.tattooId = tattoo.id;
          }
        });
      })
      .expect(200, done);
    });
    it("should create favorite Tatto", function (done) {
      request(sails.hooks.http.app)
      .post('/tattoofav')
      .set('Authorization', mockuser.token)
      .send(mocktattoo)
      .expect(function(res) {
        assert.equal(res.body.message, 'favorite is added');
      })
      .expect(200, done); 
    });
    it("should consult favorites Tattos by User", function (done) {
      request(sails.hooks.http.app)
      .get('/tattoofav')
      .set('Authorization', mockuser.token)
      .expect(function(res) {
        assert.equal(res.body.length, 1);
        assert.equal(res.body[0].tattooId, mocktattoo.id);
      })
      .expect(200, done); 
    });
    it("should remove favorite Tattoo", function (done) {
      request(sails.hooks.http.app)
      .delete('/tattoofav')
      .set('Authorization', mockuser.token)
      .send(mocktattoo)
      .expect(function(res) {
        assert.equal(res.body.message, 'favorite is removed');
      })
      .expect(200, done); 
    });
});   