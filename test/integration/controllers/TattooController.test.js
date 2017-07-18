var request = require('supertest'),
  assert = require('assert');

describe('TattooController', function() {

  var mocktattoo={
        dimensionsX: 3,
        dimensionsY: 4,
        name: 'tattoo',
        element: 1,
        partbody: 2,
        style: 1,
        artistId: 2
      },
      mockadmin={
        email: 'admin@latatoadora.com',
        name: 'admin',
        password: 'password',
        userType: 1
      };
    
    it("should create a new Tattoo", function (done) {
      request(sails.hooks.http.app)
      .post('/tattoo')
      .send(mocktattoo)
      .expect(function(res) {
        assert.notEqual(res.body[0].id, null);
        assert.equal(res.body[0].dimensionsY, mocktattoo.dimensionsY);
        assert.equal(res.body[0].dimensionsX, mocktattoo.dimensionsX);
        assert.equal(res.body[0].name, mocktattoo.name);
        assert.equal(res.body[0].element, mocktattoo.element);
        assert.equal(res.body[0].partbody, mocktattoo.partbody);
        assert.equal(res.body[0].style, mocktattoo.style);
        mocktattoo.id = res.body[0].id;
      })
      .expect(200, done);
    });
    it("should create an login a user type admin", function (done) {
      User.create(mockadmin)
      .then(function (admin){
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
        assert.equal(res.body.id , mocktattoo.id);
        assert.equal(res.body.publicate, true);
      })
      .expect(200, done);
    });
});   