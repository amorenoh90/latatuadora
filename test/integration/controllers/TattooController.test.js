/**
 * Created by edwin on 10/05/17.
 */
var request = require('supertest'),
  assert = require('assert');

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
        //verify the element get an id
        assert.notEqual(res[0].hasOwnProperty('id'), null);
        assert.equal(res[0].name, mockTattoo.name);
        assert.equal(res[0].tattootype, mockTattoo.tattootype);
        assert.equal(res[0].partbody, mockTattoo.partbody);
        assert.equal(res[0].element, mockTattoo.element);
        assert.equal(res[0].dimensionsY, mockTattoo.dimensionsY);
        assert.equal(res[0].dimensionsX, mockTattoo.dimensionsX);
        assert.equal(res[0].publicate, mockTattoo.publicate);
        assert.equal(res[0].image, mockTattoo.image);
        done();
      });
    });
  });

});
