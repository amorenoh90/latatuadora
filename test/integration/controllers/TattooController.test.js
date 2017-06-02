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
      .attach('image', '/home/edwin/Escritorio/Blick/latatuadora/assets/Tattoo/images/c22bf97b-ef64-4d3a-a841-c46f19771a4b.jpg')
      .field(mocktattoo)
      .expect(function(res) {
        assert.notEqual(res.body[0].id, null);
        assert.equal(res.body[0].dimensionsY, mocktattoo.dimensionsY);
        assert.equal(res.body[0].dimensionsX, mocktattoo.dimensionsX);
        assert.equal(res.body[0].name, mocktattoo.name);
        assert.equal(res.body[0].element, mocktattoo.element);
        assert.equal(res.body[0].partbody, mocktattoo.partbody);
        assert.equal(res.body[0].style, mocktattoo.style);
      })
      .expect(200, done);
    });
});   