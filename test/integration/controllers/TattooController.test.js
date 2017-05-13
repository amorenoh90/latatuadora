/**
 * Created by edwin on 10/05/17.
 */
var request = require('supertest');

describe('TattooController', function() {
    describe('CRUD tattoo', function () {
    it('should to add a new tattoo with params', function (done) {
      var mockTattoo = {
        typetattoo: 1,
        partbody: 1,
        element:1,
        dimensionsX:12.5,
        dimensionsY:10.5,
        publicate: false
      }
      request(sails.hooks.http.app)
        .post('/tattoo/add')
        .send(mockTattoo)
        .expect(200)
        .expect('nice', done);
      Tattoo.findOne(mockTattoo)
    });
  });

});
