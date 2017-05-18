/**
 * Created by edwin on 15/05/17.
 */
var request = require('supertest'),
  assert = require('assert');

describe('ElementController', function() {

  describe('CRUD Body Element ', function () {
  	var mockElementInsert = {
  		element: "Agua"
  	},
  		mockElementUpdate = {
  			element: "Tierra",
  			id: 2
  		}
    it('should to add a new Element ', function (done) {
    	Element.create({element:'Fuego'}).exec(function (err, res, element){});

      request(sails.hooks.http.app)
        .post('/element/add')
        .send(mockElementInsert)
        .expect(200, done);
    });
    it('should get all Elements', function (done) {
      request(sails.hooks.http.app)
        .get('/element/get')
        .set('Accept', 'application/json')
        .expect(function(res) {
          assert.equal(res.body.length, 2)
          assert.notEqual(res.body[0].hasOwnProperty('id'), null);
          assert.equal(res.body[1].element, mockElementInsert.element);
          
        })
        .expect(200, done);
    });
    it('should update a Element', function (done) {
      request(sails.hooks.http.app)
        .post('/element/update')
        .send(mockElementUpdate)
        .expect(function(res){})
        .expect(200, done);
    });
    it('should get a Element Updated', function (done) {
      request(sails.hooks.http.app)
        .post('/element/getOne')
        .send({id: mockElementUpdate.id})
        .expect(function(res) {
          assert.equal(res.body.id, mockElementUpdate.id);
          assert.equal(res.body.element, mockElementUpdate.element);        })
        .expect(200, done);
    });
    it('should delete a Element', function (done) {
      request(sails.hooks.http.app)
      .delete('/element/delete')
      .send({id: mockElementUpdate.id})
      .expect(200, done);
    }); 
    it('Should get a []', function (done) {
      request(sails.hooks.http.app)
        .post('/element/getOne')
        .send({id: mockElementUpdate.id})
        .expect([])
        .expect(200, done);
       //Element.destroy({element:'Pierna'}).exec(function (err, res, element){});
    }); 
  });

});