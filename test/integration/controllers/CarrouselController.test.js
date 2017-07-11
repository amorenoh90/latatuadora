var request = require('supertest'),
  assert = require('assert');

describe('ArtistController', function() {

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
        email: "studio@latatuadora.com",
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
  it('should add Image for Studio Carrousel', function (done) { 
    request(sails.hooks.http.app)
    .post('/carrousel')
    .set('X-Authorization', mockStudio.token)
    .attach('image', sails.config.appPath + "/test/resources/test.jpg")
    .expect(function (res) {
      assert.notEqual(res.body.url, null);
      assert.notEqual(res.body.studio, null);
    })    
    .expect(200, done);
    
  });
});