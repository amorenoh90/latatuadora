/**
 * Created by edwin on 15/05/17.
 */
var request = require('supertest'),
  assert = require('assert');

describe('QuotationController', function() {

  var id,
      step1 = {
        dimensionsX: 8,
        dimensionsY: 10
      },
      step2 = {
        style: 1
      },
      step3 = {
        comments: "un tatuaje aca bien chido"
      },
      step4={
        name: "Pepito",
        email: "blick@b.com",
        city: "CDMX",
        userType: 5,
        id: 1,
        telephone: 92050923
      };

    it("should add dimensions X, Y (step 1)", function (done) {
      request(sails.hooks.http.app)
      .post('/quotation')
      .send(step1)
      .expect(function(res) {
        assert.equal(res.body.dimensionsY, step1.dimensionsY);
        assert.equal(res.body.dimensionsX, step1.dimensionsX);
        id=res.body.id;
      })
      .expect(201, done);
      Style.create({name:'Religioso'}).exec(function (err, style){});
    });

    it("should add style to quotation (step 2)", function (done) {
      request(sails.hooks.http.app)
      .put('/quotation/' + id)
      .send(step2)
      .expect(function (res) {
        assert.equal(res.body.dimensionsY, step1.dimensionsY);
        assert.equal(res.body.dimensionsX, step1.dimensionsX);
        assert.equal(res.body.style.id, step2.style);
      })
      .expect(200, done);
    });

    it("should add reference and aditional comments (step3)", function (done) {
      request(sails.hooks.http.app)
      .put('/quotation/references/'+id)
      .field("id", id)
      .field(step3)
      .attach('reference', "/home/edwin/Blick/latatuadora/assets/references/images/66a68f37-9134-4684-9388-5cc74049c448.jpg")
      .expect(function (res) {
        assert.notEqual(res.body.references[0].imgUrl, null);
        assert.equal(res.body.comments, step3.comments)
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