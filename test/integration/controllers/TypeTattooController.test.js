/**
 * Created by edwin on 15/05/17.
 */

var request = require('supertest');

describe('TypeTatooController', function() {

  describe('CRUD TypeTatoo', function () {
    it('should to add a new TypeTatoo', function (done) {
      request(sails.hooks.http.app)
        .post('/typetattoo/add')
        .send({ typetatto: 'chido' })
        .expect(200)
        .expect('nice', done);
    });
  });
});
