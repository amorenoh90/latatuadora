/**
 * Created by edwin on 15/05/17.
 */
var request = require('supertest'),
  assert = require('assert');

describe('QuotationController', function() {

  it("should add Style, BodyPart", function (done) {
    Style.create({name:'Shurado'}).exec(function (err, style){});
    BodyPart.create({name:'Pierna'}).exec(function (err, style){});
    done();
  })

  var id,
      quotation = {
        dimensionsX: 4,
        dimensionsY: 4,
        style: 1,
        comments: "False comment to quote a tattoo",
        name: "Pepito",
        email: "blick@blick.com",
        city: "CDMX",
        telephone: 92050923,
        bodypart: 1
      },
      quotation2 = {
        dimensionsX: 5,
        dimensionsY: 5,
        style: 1,
        comments: "False comment to quote a tattoo",
        name: "Pepito",
        email: "blick@b.com",
        city: "CDMX",
        telephone: 92050923,
        bodypart: 1
      }

    it("should add new Quotation with one match", function (done) {
      request(sails.hooks.http.app)
      .post('/quotation')
      .send(quotation)
      .expect(function(res) {
        assert.equal(res.body.minAmount, 600);
        assert.equal(res.body.maxAmount, 800)
      })
      .expect(200, done);    
    });

    it("should add new Quotation with two matches", function (done) {
      request(sails.hooks.http.app)
      .post('/quotation')
      .send(quotation2)
      .expect(function(res) {
        assert.equal(res.body.minAmount, 900);
        assert.equal(res.body.maxAmount, 1100)
      })
      .expect(200, done);    
    });
    it("should add User info (step4)", function (done) {
      request(sails.hooks.http.app)
      .put('/quotation/user/'+id)
      .send(step4)
      .expect(function (res) {
        assert.equal(res.body.userId.name, step4.name);
        assert.equal(res.body.userId.email, step4.email);
        assert.equal(res.body.userId.telephone, step4.telephone);
      })
      .expect(200, done);
    });

});