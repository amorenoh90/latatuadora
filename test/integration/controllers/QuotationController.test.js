/**
 * Created by edwin on 15/05/17.
 */
var request = require('supertest'),
  assert = require('assert');

describe('QuotationController', function() {

  it("should add Style", function (done) {
    Style.create({name:'Religioso'}).exec(function (err, style){});
    done();
  })

  var id,
      quotation = {
        dimensionsX: 8,
        dimensionsY: 10,
        style: 1,
        comments: "False comment to quote a tattoo",
        name: "Pepito",
        email: "blick@blick.com",
        city: "CDMX",
        telephone: 92050923
      }

    it("should add new Quotation", function (done) {
      request(sails.hooks.http.app)
      .post('/quotation')
      .send(quotation)
      .expect(function(res) {
        assert.notEqual(res.body.id, null);
        assert.equal(res.body.dimensionsY, quotation.dimensionsY);
        assert.equal(res.body.dimensionsX, quotation.dimensionsX);
        assert.equal(res.body.style.id, quotation.style);
        assert.equal(res.body.comments, quotation.comments);
        assert.equal(res.body.userId.name, quotation.name);
        assert.equal(res.body.userId.email, quotation.email);
        assert.equal(res.body.userId.city, quotation.city);
        assert.equal(res.body.userId.telephone, quotation.telephone);
      })
      .expect(200, done);    
    });


});