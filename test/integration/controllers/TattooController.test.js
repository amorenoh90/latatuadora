var request = require('supertest'),
  assert = require('assert');

describe('TattooController', function () {
  
  var mockTattoo = {
      dimensionsX: 3,
      dimensionsY: 4,
      name: 'tattoo',
      elements: [{elementId: 1}, {elementId: 2}, {elementId: 3}],
      partbody: 2,
      styles: [{styleId: 1}, {styleId: 2}, {styleId: 3}],
      artist: 1
    },
    mockTattoo2 = {
      dimensionsX: 5,
      dimensionsY: 9,
      name: 'tattoo2',
      elements: [{elementId: 4}, {elementId: 5}, {elementId: 6}],
      partbody: 5,
      styles: [{styleId: 4}, {styleId: 5}, {styleId: 6}],
      artist: 1
    },
    tattoolength = 0,
    mockadmin = {
      email: 'admin@latatoadora.com',
      name: 'admin',
      password: 'password',
      userType: 1
    },
    mockArtist = {
      name: "Awesome Artist"
    },
    mockStudio = {
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
      name: "Studio-Test - " + new Date().getTime(),
      email: "studiotattoo@latatuadora.com",
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
        User.findOne({email: mockStudio.email}).then(function (user) {
          Studio.findOne({userId: user.id}).then(function (studio) {
            mockStudio.id = studio.id;
            mockArtist.studio = mockStudio.id;
            Artist.create(mockArtist).then(function (artist) {
              mockTattoo.artist = artist.id;
              mockTattoo2.artist = artist.id;
            });
          });
        });
      })
      .expect(200, done);
  });
  
  it("should create a new Tattoo", function (done) {
    request(sails.hooks.http.app)
      .post('/tattoo')
      .set('X-Authorization', mockStudio.token)
      .send(mockTattoo)
      .expect(function (res) {
        assert.notEqual(res.body[0].id, null);
        assert.equal(res.body[0].dimensionsY, mockTattoo.dimensionsY);
        assert.equal(res.body[0].dimensionsX, mockTattoo.dimensionsX);
        assert.equal(res.body[0].name, mockTattoo.name);
        assert.equal(res.body[0].partbody, mockTattoo.partbody);
        mockTattoo.id = res.body[0].id;
      })
      .expect(200, done);
  });
  it("should create a new Tattoo 2", function (done) {
    Tattoo.find().exec(function (err, tattoos) {
      if (err) {
        return done(err);
      } else {
        tattoolength = tattoos.length - 1;
      }
    });
    request(sails.hooks.http.app)
      .post('/tattoo')
      .set('X-Authorization', mockStudio.token)
      .send(mockTattoo2)
      .expect(function (res) {
        assert.equal(res.body[0].dimensionsY, mockTattoo2.dimensionsY);
        assert.equal(res.body[0].dimensionsX, mockTattoo2.dimensionsX);
        assert.equal(res.body[0].name, mockTattoo2.name);
        assert.equal(res.body[0].partbody, mockTattoo2.partbody);
        mockTattoo2.id = res.body[0].id;
      })
      .expect(200, done);
  });
  it("should find Tattoo By Studio", function (done) {
    request(sails.hooks.http.app)
      .get('/tattoo/studio/' + mockStudio.id)
      .expect(function (res) {
        assert.equal(res.body[0].dimensionsY, mockTattoo2.dimensionsY);
        assert.equal(res.body[0].dimensionsX, mockTattoo2.dimensionsX);
        assert.equal(res.body[0].name, mockTattoo2.name);
        assert.equal(res.body[0].elements.length, mockTattoo2.elements.length);
        assert.equal(res.body[0].styles.length, mockTattoo2.styles.length);
        assert.equal(res.body[0].partbody, mockTattoo2.partbody);
        assert.notEqual(res.body[0].studio, null);
      })
      .expect(200, done);
  });
  it("should create an login a user type admin", function (done) {
    User.create(mockadmin)
      .then(function (admin) {
        return admin;
      })
      .then(function (admin) {
        request(sails.hooks.http.app)
          .post('/login')
          .send(mockadmin)
          .expect(function (res) {
            assert.notEqual(res.body.token, null);
            mockadmin.token = res.body.token;
          })
          .expect(200, done);
      })
      .catch(function (err) {
        done(err);
      });
  });
  it("should approve tattoo", function (done) {
    request(sails.hooks.http.app)
      .put('/tattoo/approve/' + mockTattoo.id)
      .set('X-Authorization', mockadmin.token)
      .send({publicate: true})
      .expect(function (res) {
        assert.equal(res.body.id, mockTattoo.id);
        assert.equal(res.body.publicate, true);
      })
      .expect(200, done);
  });
  it("should get approved tattoos", function (done) {
    request(sails.hooks.http.app)
      .get('/tattoo')
      .send({publicate: true})
      .expect(function (res) {
        assert.equal(res.body[0].publicate, true);
        assert.equal(res.body[0].dimensionsY, mockTattoo.dimensionsY);
        assert.equal(res.body[0].dimensionsX, mockTattoo.dimensionsX);
        assert.equal(res.body[0].name, mockTattoo.name);
        assert.equal(res.body[0].elements.length, mockTattoo.elements.length);
        assert.equal(res.body[0].styles.length, mockTattoo.styles.length);
        assert.equal(res.body[0].partbody, mockTattoo.partbody);
      })
      .expect(200, done);
  });
  it("should get not approved tattoos", function (done) {
    request(sails.hooks.http.app)
      .get('/tattoo/notApproved')
      .set('X-Authorization', mockadmin.token)
      .expect(function (res) {
        assert.equal(res.body[tattoolength].publicate, false);
        assert.equal(res.body[tattoolength].dimensionsY, mockTattoo2.dimensionsY);
        assert.equal(res.body[tattoolength].dimensionsX, mockTattoo2.dimensionsX);
        assert.equal(res.body[tattoolength].name, mockTattoo2.name);
        assert.equal(res.body[tattoolength].elements.length, mockTattoo2.elements.length);
        assert.equal(res.body[tattoolength].styles.length, mockTattoo2.styles.length);
        assert.equal(res.body[tattoolength].partbody, mockTattoo2.partbody);
      })
      .expect(200, done);
  });
});
