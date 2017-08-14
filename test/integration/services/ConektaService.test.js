var mocha = require('mocha'),
  assert = require('assert');
request = require('supertest');
describe('Conekta Service', function () {

  var mockitem = {
      itemType: 1,
      itemId: 1,
    },
    mockflash = {
      amount: 300.00,
      sizeId: 1,
      significant: 'mylife',
      artistId: 1,
      copyrigth: true,
      styleId: 1,
      elementId: 2
    },
    mockplan = {
      name: 'mockplan',
      amount: 3500
    },
    mockstudio = {
      "schedule": [{"dayId": 1, "start": 8, "end": 15}, {"dayId": 2, "start": 8, "end": 15}, {
        "dayId": 3,
        "start": 8,
        "end": 15
      }],
      "styles": [{"styleId": 1}, {"styleId": 2}],
      "form": "user",
      "name": "Studio-Test",
      "email": "userr@latatuadora.com",
      "password": "password",
      "state": "CDMX",
      "suburb": "Roma",
      "town": "Cuahutemoc",
      "street": "Chapultepec",
      "zc": "07000"
    };
  it("should logup a Studio User (prerequisites)", function (done) {
    request(sails.hooks.http.app)
      .post('/logup')
      .send(mockstudio)
      .expect(function (res) {
        mockstudio.token = res.body.token;
        assert.notEqual(res.body, null);
      })
      .expect(200, done);
  });
  it("add flash (prerequisites)", function (done) {
    Flash.create(mockflash).exec(function (err, flash) {
      if (err) {
        return done(err);
      }
      else {
        mockitem.itemId = flash.id;
        mockflash.id = flash.id;
        return done();
      }
    });
  });
  it('should create a new conekta plan', function (done) {
    this.timeout(5000);
    ConektaService.createPlan(mockplan, function (err, plan) {
      if (err) {
        done(err);
      }
      else {
        done();
      }
    });
  });
});
