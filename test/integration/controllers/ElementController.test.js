/**
 * Created by edwin on 15/05/17.
 */

var request = require('supertest');

describe('ElementController', function() {

  describe('CRUD Element', function () {
    it('should to add a new Element', function (done) {
      request(sails.hooks.http.app)
        .post('/element/add')
        .send({ element: 'flor' })
        .expect(200)
        .expect('nice', done);
    });
  });

});
