var request = require('supertest'),
  assert = require('assert');

describe('FlashController', function () {

  var mockflash = {
      amount: 300.00,
      dimensionsX: 1,
      dimensionsY: 1,
      significant: 'mylife',
      artistId: 1,
      copyrigth: true,
      styleId: 1,
      elementId: 2
    },
    mockflash2 = {
      amount: 560.00,
      dimensionsX: 1,
      dimensionsY: 1,
      significant: 'mylife flash 2',
      artistId: 1,
      copyrigth: true,
      styleId: 4,
      elementId: 3
    };
  flashlength = 0;
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
    email: "studioflash@latatuadora.com",
    password: "password",
    state: "CDMX",
    suburb: "Roma",
    town: "Cuahutemoc"
  };
  var mockadmin = {
    email: 'adminFlashes@latatoadora.com',
    name: 'admin',
    password: 'password',
    userType: 1
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
    Style.create({name: 'Style'}).exec(function (err, finn) {
      if (err) {
        done(err)
      }
    });
    Element.create({name: 'Element'}).exec(function (err, finn) {
      if (err) {
        done(err)
      }
      done();
    });
  });
  it("should create a new Flash", function (done) {
    request(sails.hooks.http.app)
      .post('/flash')
      .set('X-Authorization', mockStudio.token)
      .send(mockflash)
      .expect(function (res) {
        assert.notEqual(res.body.id, null);
        assert.equal(res.body.amount, mockflash.amount);
        assert.equal(res.body.sizeId, mockflash.sizeId);
        assert.equal(res.body.significant, mockflash.significant);
        assert.equal(res.body.copyrigth, mockflash.copyrigth);
        assert.notEqual(res.body.studio, null);
        mockflash.id = res.body.id;
        mockStudio.id = res.body.studio;
      })
      .expect(200, done);
  });
  it("should create a new Flash 2", function (done) {
    Flash.find({}).exec(function (err, flashes) {
      if (err) {
        return done(err);
      }
      else {
        flashlength = flashes.length - 1;
      }
    });
    request(sails.hooks.http.app)
      .post('/flash')
      .set('X-Authorization', mockStudio.token)
      .send(mockflash2)
      .expect(function (res) {
        assert.notEqual(res.body.id, null);
        assert.equal(res.body.amount, mockflash2.amount);
        assert.equal(res.body.sizeId, mockflash2.sizeId);
        assert.equal(res.body.significant, mockflash2.significant);
        assert.equal(res.body.copyrigth, mockflash2.copyrigth);
        assert.notEqual(res.body.studio, null);
      })
      .expect(200, done);
  });
  it("should find Flash By Studio", function (done) {
    request(sails.hooks.http.app)
      .get('/flash/studio/' + mockStudio.id)
      .expect(function (res) {
        assert.notEqual(res.body.length, 0);
        assert.notEqual(res.body[0].id, null);
        assert.equal(res.body[0].amount, mockflash.amount);
        assert.equal(res.body[0].sizeId, mockflash.sizeId);
        assert.equal(res.body[0].significant, mockflash.significant);
        assert.equal(res.body[0].copyrigth, mockflash.copyrigth);
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
  it("should approve flash", function (done) {
    request(sails.hooks.http.app)
      .put('/flash/approve/' + mockflash.id)
      .set('X-Authorization', mockadmin.token)
      .send({publicate: true})
      .expect(function (res) {
        assert.equal(res.body.id, mockflash.id);
        assert.equal(res.body.publicate, true);
      })
      .expect(200, done);
  });
  it("should get approved flashes", function (done) {
    request(sails.hooks.http.app)
      .get('/flash')
      .send({publicate: true})
      .expect(function (res) {
        assert.equal(res.body[0].publicate, true);
        assert.equal(res.body[0].dimensionsY, mockflash.dimensionsY);
        assert.equal(res.body[0].dimensionsX, mockflash.dimensionsX);
        assert.equal(res.body[0].name, mockflash.name);
        assert.equal(res.body[0].element, mockflash.element);
        assert.equal(res.body[0].partbody, mockflash.partbody);
        assert.equal(res.body[0].style, mockflash.style);
      })
      .expect(200, done);
  });
  it("should get not approved flashes", function (done) {
    request(sails.hooks.http.app)
      .get('/flash/notApproved')
      .set('X-Authorization', mockadmin.token)
      .expect(function (res) {
        assert.equal(res.body[flashlength].publicate, false);
        assert.equal(res.body[flashlength].dimensionsY, mockflash2.dimensionsY);
        assert.equal(res.body[flashlength].dimensionsX, mockflash2.dimensionsX);
        assert.equal(res.body[flashlength].name, mockflash2.name);
        assert.equal(res.body[flashlength].element, mockflash2.element);
        assert.equal(res.body[flashlength].partbody, mockflash2.partbody);
        assert.equal(res.body[flashlength].style, mockflash2.style);
      })
      .expect(200, done);
  });
});
