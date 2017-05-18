/**
 * Created by edwin on 15/05/17.
 */

var request = require('supertest'),
  assert = require('assert');

describe('TypeTattooController', function() {

  describe('CRUD Body TypeTattoo ', function () {
  	var mockTypeTattooInsert = {
  		type: "Aqua"
  	},
  		mockTypeTattooUpdate = {
  			type: "milenial",
  			id: 3
  		}
    it('should to add a new TypeTattoo ', function (done) {
    	TypeTattoo.create({type:'Fuego'}).exec(function (err, res, type){});

      request(sails.hooks.http.app)
        .post('/typetattoo/add')
        .send(mockTypeTattooInsert)
        .expect(200, done);
    });
    it('should get all TypeTattoos', function (done) {
      request(sails.hooks.http.app)
        .get('/typetattoo/get')
        .set('Accept', 'application/json')
        .expect(function(res) {
          assert.equal(res.body.length, 2)
          assert.notEqual(res.body[0].hasOwnProperty('id'), null);
          assert.equal(res.body[1].type, mockTypeTattooInsert.type);
          
        })
        .expect(200, done);
    });
    it('should update a TypeTattoo', function (done) {
      request(sails.hooks.http.app)
        .post('/typetattoo/update')
        .send(mockTypeTattooUpdate)
        .expect(function(res){})
        .expect(200, done);
    });
    it('should get a TypeTattoo Updated', function (done) {
      request(sails.hooks.http.app)
        .post('/typetattoo/getOne')
        .send({id: mockTypeTattooUpdate.id})
        .expect(function(res) {
          assert.equal(res.body.id, mockTypeTattooUpdate.id);
          assert.equal(res.body.type, mockTypeTattooUpdate.type);        })
        .expect(200, done);
    });
    it('should delete a TypeTattoo', function (done) {
      request(sails.hooks.http.app)
      .delete('/typetattoo/delete')
      .send({id: mockTypeTattooUpdate.id})
      .expect(200, done);
    }); 
    it('Should get a []', function (done) {
      request(sails.hooks.http.app)
        .post('/typetattoo/getOne')
        .send({id: mockTypeTattooUpdate.id})
        .expect([])
        .expect(200, done);
       
    }); 
  });

});