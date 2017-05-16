/**
 * Created by edwin on 10/05/17.
 */
var request = require('supertest');

describe('TattooController', function() {
  describe('CRUD tattoo', function () {
    var tattos,
      mockTattoo = {
      name: "tattoo",
      tattootype: 1,
      partbody: 1,
      element: 1,
      dimensionsX: 12.5,
      dimensionsY: 10.5,
      publicate: false,
      image: "kjabfiabf.jpg"
    }
    it('should to add a new tattoo with params', function (done) {
      request(sails.hooks.http.app)
        .post('/tattoo/add') //create
        .send(mockTattoo)
        .expect(200)
        .expect('nice', done)
    });
    it('should get tattoo', function (done) {

      Tattoo.find(mockTattoo, function (err, res) {
        sails.log(":v",res, err);
        // res.length.should.not.be.eql(0);
        res.to.have.property('id').to.not.equal('null')
        done();
      });
    });
  });

});
