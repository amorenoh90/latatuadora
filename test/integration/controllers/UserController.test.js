var mocha = require('mocha'),
  assert = require('assert');
request = require('supertest');

describe('UserController', function () {

  var mockuser = {
    name: "Pepito",
    email: "blick@lick.com",
    password: "password",
    form: "user"
  };

  var mockitem = {
      itemType: 2,
      itemId: 2,
    },
    mockflash = {
      amount: 500.00,
      sizeId: 2,
      significant: 'mylife',
      artistId: 2,
      copyrigth: true,
      styleId: 2,
      elementId: 3
    },
    mockplan = {
      name: 'mockplan',
      amount: 4500
    },
    mockstudio = {
      form: "studio",
      "schedule": [{
          "dayId": 2,
          "start": 7,
          "end": 16
        },
        {
          "dayId": 3,
          "start": 9,
          "end": 16
        },
        {
          "dayId": 4,
          "start": 9,
          "end": 16
        }
      ],
      "styles": [{
          "styleId": 2
        },
        {
          "styleId": 3
        }
      ],
      "name": "Studio",
      "email": "createdstudio@latatuadora.com",
      "password": "contraseña",
      "state": "CDMX",
      "suburb": "Condesa",
      "town": "Aragón",
      "street": "Reforma",
      "zc": "07001"
    };

  var mockfreelancer = {
    "form": "freelancer",
    "about": "Tamal",
    "email": "rash240719@gmail.mx",
    "name": "Rashīd Teoyokonetl",
    "websiteUrl": "rsw.com",
    "password": "password2",
    "telephone": 5562059246,
    "userType": 1
  };

  it("should logup a normal User", function (done) {
    request(sails.hooks.http.app)
      .post('/logup')
      .send(mockuser)
      .expect(function (res) {
        mockuser.token = res.body.token;
        assert.notEqual(res.body, null);
      })
      .expect(200, done);
  });

  it("should find favs", function (done) {
    request(sails.hooks.http.app)
      .get('/favs')
      .set('X-Authorization', mockuser.token)
      .expect(function (res) {
        var test = [];
        assert.equal(res.body.tattoos[0], test[0]);
        assert.equal(res.body.flashes[0], test[0]);
      })
      .expect(200, done);
  });

  it("should login a normal User", function (done) {
    request(sails.hooks.http.app)
      .post('/login')
      .send(mockuser)
      .expect(function (res) {
        assert.notEqual(res.body.token, null);
        assert.equal(res.body.usertype, 2);
      })
      .expect(200, done);
  });

  it("should logup a Studio", function (done) {
    request(sails.hooks.http.app)
      .post('/logup')
      .send(mockstudio)
      .expect(function (res) {
        mockstudio.token = res.body.token;
        assert.notEqual(res.body, null);
      })
      .expect(200, done);
  });

  it("should logup a Freelancer", function (done) {
    request(sails.hooks.http.app)
      .post('/logup')
      .send(mockfreelancer)
      .expect(function (res) {
        mockstudio.token = res.body.token;
        assert.notEqual(res.body, null);
      })
      .expect(200, done);
  });

  var mockuserEdition = {
    form: "user",
    id: 1,
    email: "rash240719@gmail.com",
    name: "Rashīd Teoyokonetl",
    lastname: "Dylan",
    password: "password2",
    telephone: 5562059246,
    userType: 1
  };

  var mockstudioEdition = {
    "form": "studio",
    "studio": 1,
    "user": 2,
    "certCofepris": true,
    "about": "about our studio",
    "email": "dyll240719@gmail.com",
    "name": "Tattoos",
    "street": "Puerto Málaga",
    "numInt": 3,
    "numExt": 62,
    "lat": 27,
    "long": 43,
    "zc": "04979",
    "state": "SLP",
    "town": "Somewhere",
    "suburb": "Someplace",
    "password": "new password",
    "telephone": 5562059247,
    "userType": 2
  };

  var mockfreelancerEdition = {
    "form": "freelancer",
    "id": 3,
    "about": "About me",
    "email": "fm1998@gmail.com",
    "name": "Dylan Nexkoyotl",
    "websiteUrl": "dn.mx",
    "password": "another password",
    "fbUrl": "FB",
    "twUrl": "TWITTEr",
    "insUrl": "INSTa",
    "telephone": 5562059245,
    "userType": 1
  };

  it("should edit a User", function (done) {
    request(sails.hooks.http.app)
      .put('/edit')
      .send(mockuserEdition)
      .expect(function (res) {
        mockstudio.token = res.body.token;
        assert.notEqual(res.body, null);
      })
      .expect(200, done);
  });

  it("should edit a Studio (prerequisites)", function (done) {
    request(sails.hooks.http.app)
      .put('/edit')
      .send(mockstudioEdition)
      .expect(function (res) {
        mockstudio.token = res.body.token;
        assert.notEqual(res.body, null);
      })
      .expect(200, done);
  });

  it("should edit a Studio (prerequisites)", function (done) {
    request(sails.hooks.http.app)
      .put('/edit')
      .send(mockfreelancerEdition)
      .expect(function (res) {
        mockstudio.token = res.body.token;
        assert.notEqual(res.body, null);
      })
      .expect(200, done);
  });
});
