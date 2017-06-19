var request = require('supertest'),
  assert = require('assert');

describe('TattooController', function() {

  var mocktattoo={
        dimensionsX: 3,
        dimensionsY: 4,
        name: 'tattoo',
        element: 1,
        partbody: 2,
        style: 1,
        artistId: 2
      }

    it("should create a new Tattoo", function (done) {
      request(sails.hooks.http.app)
      .post('/tattoo')
      .send(mocktattoo)
      .expect(function(res) {
        assert.notEqual(res.body.id, null);
        assert.equal(res.body.dimensionsY, mocktattoo.dimensionsY);
        assert.equal(res.body.dimensionsX, mocktattoo.dimensionsX);
        assert.equal(res.body.name, mocktattoo.name);
        assert.equal(res.body.element, mocktattoo.element);
        assert.equal(res.body.partbody, mocktattoo.partbody);
        assert.equal(res.body.style, mocktattoo.style);
      })
      .expect(200, done);
    });
});   