/**
 * Created by edwin on 15/05/17.
 */


var request = require('supertest');

describe('BodyPartController', function() {

  describe('CRUD Body Part ', function () {
    it('should to add a new BodyPart', function (done) {
      request(sails.hooks.http.app)
        .post('/bodypart/add')
        .send({ part: 'pata' })
        .expect(200)
        .expect('nice', done);
    });
  });

});
