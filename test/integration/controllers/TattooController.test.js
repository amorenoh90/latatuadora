var request = require('supertest'),
  assert = require('assert');

describe('TattooController', function () {

  var mocktattoo = {
      dimensionsX: 3,
      dimensionsY: 4,
      name: 'tattoo',
      element: 1,
      partbody: 2,
      style: 1,
      artistId: 2
    },
    mocktattoo2 = {
      dimensionsX: 5,
      dimensionsY: 9,
      name: 'tattoo2',
      element: 4,
      partbody: 5,
      style: 7,
      artistId: 8
    };
  tattoolength = 0,
    mockadmin = {
      email: 'admin@latatoadora.com',
      name: 'admin',
      password: 'password',
      userType: 1
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
      name: "Studio-Test",
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
      })
      .expect(200, done);
  });

  it("should create a new Tattoo", function (done) {
    request(sails.hooks.http.app)
      .post('/tattoo')
      .set('X-Authorization', mockStudio.token)
      .send(mocktattoo)
      .expect(function (res) {
        -
          assert.notEqual(res.body[0].id, null);
        assert.equal(res.body[0].dimensionsY, mocktattoo.dimensionsY);
        assert.equal(res.body[0].dimensionsX, mocktattoo.dimensionsX);
        assert.equal(res.body[0].name, mocktattoo.name);
        assert.equal(res.body[0].element, mocktattoo.element);
        assert.equal(res.body[0].partbody, mocktattoo.partbody);
        assert.equal(res.body[0].style, mocktattoo.style);
        mocktattoo.id = res.body[0].id;
        mockStudio.id = res.body[0].studio;
      })
      .expect(200, done);
  });
  it("should create a new Tattoo 2", function (done) {
    Tattoo.find().exec(function (err, tattoos) {
      if (err) {
        return done(err);
      }
      else {
        tattoolength = tattoos.length - 1;
      }
    });
    request(sails.hooks.http.app)
      .post('/tattoo')
      .set('X-Authorization', mockStudio.token)
      .send(mocktattoo2)
      .expect(function (res) {
        assert.equal(res.body[0].dimensionsY, mocktattoo2.dimensionsY);
        assert.equal(res.body[0].dimensionsX, mocktattoo2.dimensionsX);
        assert.equal(res.body[0].name, mocktattoo2.name);
        assert.equal(res.body[0].element, mocktattoo2.element);
        assert.equal(res.body[0].partbody, mocktattoo2.partbody);
        assert.equal(res.body[0].style, mocktattoo2.style);
        mocktattoo2.id = res.body[0].id;
      })
      .expect(200, done);
  });
  it("should find Tattoo By Studio", function (done) {
    request(sails.hooks.http.app)
      .get('/tattoo/studio/' + mockStudio.id)
      .expect(function (res) {
        assert.equal(res.body[0].dimensionsY, mocktattoo.dimensionsY);
        assert.equal(res.body[0].dimensionsX, mocktattoo.dimensionsX);
        assert.equal(res.body[0].name, mocktattoo.name);
        assert.equal(res.body[0].element, mocktattoo.element);
        assert.equal(res.body[0].partbody, mocktattoo.partbody);
        assert.equal(res.body[0].style, mocktattoo.style);
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
      .put('/tattoo/approve/' + mocktattoo.id)
      .set('X-Authorization', mockadmin.token)
      .send({publicate: true})
      .expect(function (res) {
        assert.equal(res.body.id, mocktattoo.id);
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
        assert.equal(res.body[0].dimensionsY, mocktattoo.dimensionsY);
        assert.equal(res.body[0].dimensionsX, mocktattoo.dimensionsX);
        assert.equal(res.body[0].name, mocktattoo.name);
        assert.equal(res.body[0].element, mocktattoo.element);
        assert.equal(res.body[0].partbody, mocktattoo.partbody);
        assert.equal(res.body[0].style, mocktattoo.style);
      })
      .expect(200, done);
  });
  it("should get not approved tattoos", function (done) {
    request(sails.hooks.http.app)
      .get('/tattoo/notApproved')
      .set('X-Authorization', mockadmin.token)
      .expect(function (res) {
        assert.equal(res.body[tattoolength].publicate, false);
        assert.equal(res.body[tattoolength].dimensionsY, mocktattoo2.dimensionsY);
        assert.equal(res.body[tattoolength].dimensionsX, mocktattoo2.dimensionsX);
        assert.equal(res.body[tattoolength].name, mocktattoo2.name);
        assert.equal(res.body[tattoolength].element, mocktattoo2.element);
        assert.equal(res.body[tattoolength].partbody, mocktattoo2.partbody);
        assert.equal(res.body[tattoolength].style, mocktattoo2.style);
      })
      .expect(200, done);
  });
});
