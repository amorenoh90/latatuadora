var request = require('supertest'),
  assert = require('assert'),
  fs = require('fs');

describe('ArtistController', function() {

  var mockartist = {
        name: 'The Artist',
        bio: 'I Am Artist, The Artist'
      },
      mockStudio = {
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

  var filename = 'x.png'
  var boundary = Math.random();
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
  it("should create a new Artist", function (done) {
    request(sails.hooks.http.app)
    .post('/artist')
    .set('X-Authorization', mockStudio.token)
    .send(mockartist)
    .expect(function(res) {
      assert.notEqual(res.body.id, null);
      assert.equal(res.body.name, mockartist.name);
      assert.equal(res.body.bio, mockartist.bio);
      mockartist.id = res.body.id;
    })
    .expect(201, done);
  });
  it('should update avatar', function (done) {
  
    request(sails.hooks.http.app)
    .put('/artist')
    .set('X-Authorization', mockStudio.token)
    .field("id", mockartist.id)
    .attach('avatar', sails.config.appPath + "/test/resources/test.jpg")
    .expect(function (res) {
      assert.notEqual(res.body[0].avatarUrl, null);
    })    
    .expect(200, done);
    
  });
});