/**
 * Created by edwin on 15/05/17.
 */
var request = require('supertest'),
  assert = require('assert');

describe('QuotationController', function () {
  
  it("should add Style, BodyPart", function (done) {
    Style.create({name: 'Shurado'}).exec(function (err, style) {
    });
    BodyPart.create({name: 'Pierna'}).exec(function (err, style) {
    });
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
      email: "blick@blick.com",
      city: "CDMX",
      telephone: 92050923,
      bodypart: 1
    },
    quotation3 = {
      dimensionsX: 10,
      dimensionsY: 15,
      style: 1,
      comments: "False comment to quote a tattoo",
      name: "Pepito",
      email: "blick@blick.mx",
      city: "CDMX",
      telephone: 92050923,
      bodypart: 1,
      studio: 4
    }
  var mockStudio = {
      schedule: [
        {
          dayId: 1,
          start: 8,
          end: 15
        },
        {
          dayId: 2,
          start: 8,
          end: 15
        },
        {
          dayId: 3,
          start: 8,
          end: 15
        }
      ],
      styles: [
        {
          styleId: 1
        },
        {
          styleId: 2
        }
      ],
      form: "studio",
      name: "Studio-Test",
      email: "Quotationstudio@latatuadora.com",
      password: "password",
      state: "CDMX",
      suburb: "Roma",
      town: "Cuahutemoc"
    },
    mockImage = {};
  it("Studios", function (done) {
    Studio.find().exec(function (err, studios) {
      if (err) {
        done(err);
      }
      quotation3.studio = studios.length + 1;
      done();
    });
  });
  it("should add new Quotation with one match", function (done) {
    request(sails.hooks.http.app)
      .post('/quotation')
      .send(quotation)
      .expect(function (res) {
        assert.equal(res.body.minAmount, 600);
        assert.equal(res.body.maxAmount, 600);
      })
      .expect(200, done);
  });
  
  it("should add new Quotation with two matches", function (done) {
    request(sails.hooks.http.app)
      .post('/quotation')
      .send(quotation2)
      .expect(function (res) {
        assert.equal(res.body.minAmount, 600);
        assert.equal(res.body.maxAmount, 1000)
      })
      .expect(200, done);
  });
  it("should create a new Studio (prerequisites)", function (done) {
    request(sails.hooks.http.app)
      .post('/logup')
      .send(mockStudio)
      .expect(function (res) {
        assert.notEqual(res.body.token, null);
        mockStudio.token = res.body.token;
        Studio.find().exec(function (err, studios) {
          if (err) {
            done(err);
          }
        });
      })
      .expect(200, done);
  });
  it("should add new Quotation with one Studio", function (done) {
    request(sails.hooks.http.app)
      .post('/quotation')
      .send(quotation3)
      .expect(function (res) {
        var resp = res.body;
        assert.equal(resp.message, "Are you quoting with study");
      })
      .expect(200, done);
  });
  it("should find Quotation with by Studio", function (done) {
    request(sails.hooks.http.app)
      .get('/quotation/studio')
      .set('X-Authorization', mockStudio.token)
      .expect(function (res) {
        assert.equal(res.body[0].styleId.id, quotation3.style);
        assert.equal(res.body[0].dimensionsY, quotation3.dimensionsY);
        assert.equal(res.body[0].dimensionsX, quotation3.dimensionsX);
        assert.equal(res.body[0].comments, quotation3.comments);
      })
      .expect(200, done);
  });
});
