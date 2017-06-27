var request = require('supertest'),
  assert = require('assert');

describe('FlashController', function() {

  var mockflash = {
        amount: 300.00,
        sizeId: 1,
        significant: 'mylife',
        artistId: 1,
        copyrigth: true,
        styleId: 1,
        elementId: 2
      };
    it("add Prerequisites", function (done) {
      Style.create({name:'Finn'}).exec(function (err, finn){
        if (err) {done(err)}
      });
      Element.create({name:'Finn'}).exec(function (err, finn){
        if (err) {done(err)}
        done();
      });
    })
    it("should create a new Flash", function (done) {
      request(sails.hooks.http.app)
      .post('/flash')
      .send(mockflash)
      .expect(function(res) {
        assert.notEqual(res.body.id, null);
        assert.equal(res.body.amount, mockflash.amount);
        assert.equal(res.body.sizeId, mockflash.sizeId);
        assert.equal(res.body.significant, mockflash.significant);
        assert.equal(res.body.copyrigth, mockflash.copyrigth);
      })
      .expect(200, done); 
    });
});   