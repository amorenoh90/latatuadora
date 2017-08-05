 var request = require('supertest'),
  assert = require('assert');

describe('FavoriteStudioController', function() {

  var mockuser = {
        form: "user",
        name: "usertest",
        email: "FavoriteStudio@latatuadora.com",
        password: "password"
      },
      mockstudio = {},
      mockstudio2 = {};
    it("should logup a normal User (prerequisites)", function (done) {
      request(sails.hooks.http.app)
      .post('/logup')
      .send(mockuser)
      .expect(function(res) {
        mockuser.token = res.body.token;
        assert.notEqual(res.body, null);
      })
      .expect(200, done);
    });
    it("should create new Studio (prerequisites)", function (done) {
      Studio.create({name:'studiotest'}).then(function (studio){
          if(studio){
            mockstudio.studio = studio.id;
            done();
          }
        }).catch(function (err) {
           done(err);
        }); 
    });
    it("should create new Studio (prerequisites)", function (done) {
      Studio.create({name:'studiotest'}).then(function (studio){
          if(studio){
            mockstudio2.studio = studio.id;
            done();
          }
        }).catch(function (err) {
           done(err);
        }); 
    });
    it("should add a new Favorite Studio", function (done) {
      request(sails.hooks.http.app)
      .post('/studiofav')
      .set('X-Authorization', mockuser.token)
      .send(mockstudio)
      .expect(function(res) {
        assert.equal(res.body.message, 'favorite is added');
      })
      .expect(200, done);
    });
    it("should add a new Favorite Studio", function (done) {
      request(sails.hooks.http.app)
      .post('/studiofav')
      .set('X-Authorization', mockuser.token)
      .send(mockstudio2)
      .expect(function(res) {
        assert.equal(res.body.message, 'favorite is added');
      })
      .expect(200, done);
    });
    it("should consult favorites Studio by User", function (done) {
      request(sails.hooks.http.app)
      .get('/studiofav')
      .set('X-Authorization', mockuser.token)
      .expect(function(res) {
        assert.equal(res.body[0].studio.id, mockstudio.studio);
      })
      .expect(200, done); 
    });
    it("should remove favorite Studio", function (done) {
      request(sails.hooks.http.app)
      .delete('/studiofav')
      .set('X-Authorization', mockuser.token)
      .send(mockstudio)
      .expect(function(res) {
        assert.equal(res.body.message, 'favorite is removed');
      })
      .expect(200, done); 
    });
});   