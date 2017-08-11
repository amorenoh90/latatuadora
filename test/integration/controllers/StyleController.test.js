var request = require('supertest'),
  assert = require('assert');

describe('StyleController', function () {
  
  describe('CRUD Style ', function () {
    var id,
      mockStyleInsert = {
        name: "Aqua"
      },
      mockStyleUpdate = {
        name: "milenial"
      }
    it('should to add a new Style ', function (done) {
      Style.create({name: 'Shurado'}).exec(function (err, res, style) {
      });
      request(sails.hooks.http.app)
        .post('/style')
        .send(mockStyleInsert)
        .expect(function (res) {
          assert.notEqual(res.body.id, null);
          assert.equal(res.body.name, mockStyleInsert.name);
          id = res.body.id;
        })
        .expect(201, done);
    });
    it('should get all Styles', function (done) {
      request(sails.hooks.http.app)
        .get('/style')
        .set('Accept', 'application/json')
        .expect(function (res) {
          assert.notEqual(res.body.length, 0);
          assert.notEqual(res.body[id - 1].hasOwnProperty('id'), null);
          assert.equal(res.body[id - 1].name, mockStyleInsert.name);
        })
        .expect(200, done);
    });
    it('should update a Style', function (done) {
      request(sails.hooks.http.app)
        .put('/style/' + id)
        .send(mockStyleUpdate)
        .expect(function (res) {
          assert.equal(res.body.id, id);
          assert.equal(res.body.name, mockStyleUpdate.name);
        })
        .expect(200, done);
    });
    it('should get a Style Updated', function (done) {
      request(sails.hooks.http.app)
        .get('/style/' + id)
        .send({id: mockStyleUpdate.id})
        .expect(function (res) {
          assert.equal(res.body.id, id);
          assert.equal(res.body.name, mockStyleUpdate.name);
        })
        .expect(200, done);
    });
    it('should delete a Style', function (done) {
      request(sails.hooks.http.app)
        .delete('/style/' + id)
        .expect(function (res) {
          assert.equal(res.body.id, id);
          assert.equal(res.body.name, mockStyleUpdate.name);
        })
        .expect(200, done);
    });
    it('Should receive 404 code', function (done) {
      request(sails.hooks.http.app)
        .get('/style/' + id)
        .expect(404, done);
    });
  });
  
});
