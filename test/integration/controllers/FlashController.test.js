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
  var mockStudio = {
      shedule:[
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
          end: 15 }
      ],
      styles:[
        {
          styleId: 1
        },
        {
          styleId: 2
        }
      ],
      form: "studio",
      name: "Studio-Test",
      email: "studioflash@latatuadora.com",
      password: "password",
      state: "CDMX",
      suburb: "Roma",
      town: "Cuahutemoc"
    };
  it("should create a new Studio (prerequisites)", function (done) {
    request(sails.hooks.http.app)
    .post('/logup')
    .send(mockStudio)
    .expect(function (res) {
      assert.notEqual(res.body.token, null);
      mockStudio.token = res.body.token;
    })
    .expect(200, done);
  });
  it("add Prerequisites", function (done) {
    Style.create({name:'Style'}).exec(function (err, finn){
      if (err) {done(err)}
    });
    Element.create({name:'Element'}).exec(function (err, finn){
      if (err) {done(err)}
      done();
    });
  });
  it("should create a new Flash", function (done) {
    request(sails.hooks.http.app)
    .post('/flash')
    .set('X-Authorization', mockStudio.token)
    .send(mockflash)
    .expect(function(res) {
      assert.notEqual(res.body.id, null);
      assert.equal(res.body.amount, mockflash.amount);
      assert.equal(res.body.sizeId, mockflash.sizeId);
      assert.equal(res.body.significant, mockflash.significant);
      assert.equal(res.body.copyrigth, mockflash.copyrigth);
      assert.notEqual(res.body.studio, null);
      mockStudio.id = res.body.studio;
    })
    .expect(200, done); 
  });
  it("should find Flash By Studio", function (done) {
    request(sails.hooks.http.app)
    .get('/flash/studio/'+ mockStudio.id)
    .expect(function(res) {
      assert.notEqual(res.body[0].id, null);
      assert.equal(res.body[0].amount, mockflash.amount);
      assert.equal(res.body[0].sizeId, mockflash.sizeId);
      assert.equal(res.body[0].significant, mockflash.significant);
      assert.equal(res.body[0].copyrigth, mockflash.copyrigth);
      assert.notEqual(res.body[0].studio, null);
    })
    .expect(200, done); 
  });
});   