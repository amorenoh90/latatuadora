var request = require('supertest'),
  assert = require('assert');

describe('FavoriteFlashController', function() {

  var mockuser = {
        form: "user",
        name: "usertest",
        email: "test@test.com",
        password: "password"
      },
      mockflash = {};
    it("should logup a normal User and create a Flash (prerequisites)", function (done) {
      request(sails.hooks.http.app)
      .post('/logup')
      .send(mockuser)
      .expect(function(res) {
        mockuser.token = res.body.token;
        assert.notEqual(res.body, null);
        Flash.create({name:'flashtest'}).exec(function (err, flash){
          if (err) { done(err); }
          else{
            mockflash.flashId = flash.id;
          }
        });
      })
      .expect(200, done);
    });
    it("should create favorite Flash", function (done) {
      request(sails.hooks.http.app)
      .post('/flashfav')
      .set('Authorization', mockuser.token)
      .send(mockflash)
      .expect(function(res) {
        assert.equal(res.body.message, 'favorite is added');
      })
      .expect(200, done); 
    });
    it("should consult favorites Flashs by User", function (done) {
      request(sails.hooks.http.app)
      .get('/flashfav')
      .set('Authorization', mockuser.token)
      .expect(function(res) {
        assert.equal(res.body.length, 1);
        assert.equal(res.body[0].flashId, mockflash.id);
      })
      .expect(200, done); 
    });
    it("should remove favorite Flash", function (done) {
      request(sails.hooks.http.app)
      .delete('/flashfav')
      .set('Authorization', mockuser.token)
      .send(mockflash)
      .expect(function(res) {
        assert.equal(res.body.message, 'favorite is removed');
      })
      .expect(200, done); 
    });
});   