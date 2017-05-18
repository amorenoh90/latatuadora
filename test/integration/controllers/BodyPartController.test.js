/**
 * Created by edwin on 15/05/17.
 */


var request = require('supertest'),
  assert = require('assert');

describe('BodyPartController', function() {

  describe('CRUD Body Part ', function () {
  	var mockPartInsert = {
  		part: "Brazo"
  	},
  		mockPartUpdate = {
  			part: "Tobillo",
  			id: 2
  		}
    it('should to add a new Part of Body', function (done) {
    	BodyPart.create({part:'Pierna'}).exec(function (err, res, part){});

      request(sails.hooks.http.app)
        .post('/bodypart/add')
        .send(mockPartInsert)
        .expect(200, done);
    });

    it('should get all Parts', function (done) {
      request(sails.hooks.http.app)
        .get('/bodypart/get')
        .set('Accept', 'application/json')
        .expect(function(res) {
          assert.equal(res.body.length, 2)
          assert.notEqual(res.body[0].hasOwnProperty('id'), null);
          assert.equal(res.body[1].part, mockPartInsert.part);
          
        })
        .expect(200, done);
    });
    
    it('should update a Part', function (done) {
      request(sails.hooks.http.app)
        .post('/bodypart/update')
        .send(mockPartUpdate)
        .expect(function(res){})
        .expect(200, done);
    });
    
    it('should get a Part Updated', function (done) {
      request(sails.hooks.http.app)
        .post('/bodypart/getOne')
        .send({id: mockPartUpdate.id})
        .expect(function(res) {
          assert.equal(res.body.id, mockPartUpdate.id);
          assert.equal(res.body.part, mockPartUpdate.part);        })
        .expect(200, done);
    });
    
    it('should delete a Part', function (done) {
      request(sails.hooks.http.app)
      .delete('/bodypart/delete')
      .send({id: mockPartUpdate.id})
      .expect(200, done);
    }); 
    
    it('Should get a []', function (done) {
      request(sails.hooks.http.app)
        .post('/bodypart/getOne')
        .send({id: mockPartUpdate.id})
        .expect([])
        .expect(200, done);
       //BodyPart.destroy({part:'Pierna'}).exec(function (err, res, element){});
    }); 
  });

});
