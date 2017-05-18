/**
 * Created by enriquelc on 9/05/17.
 */
var request = require('supertest');

describe('UserController', function() {

  describe('When user go to /user/bye redirect to /)', function() {
    it('should redirect to /', function (done) {
      request(sails.hooks.http.app)
        .get('/user/bye')
        .expect(200)
        .expect('location','/', done);
    });
  });

  describe('CRUD user', function () {
    it('should to add a new user', function (done) {
      request(sails.hooks.http.app)
        .post('/user/add')
        .send({ name: 'enriquelc', certCofepris: true })
        .expect(200)
        .expect('nice', done);
    });
  });

});
