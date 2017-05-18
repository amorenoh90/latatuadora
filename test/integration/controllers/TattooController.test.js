/**
 * Created by edwin on 10/05/17.
 */
var request = require('supertest'),
  assert = require('assert');

describe('TattooController', function() {
  describe('CRUD tattoo', function () {
    /*
    * mockTattoo 
    */
    var mockTattooInster = {
      name: "tattoo",
      tattootype: 1,
      partbody: 1,
      element: 1,
      dimensionsX: 12.5,
      dimensionsY: 10.5,
      image: "image.jpg",
      publicate: false
    },
    mockTattooUpdate = {
      id: 1,
      name: "fake",
      tattootype: 2,
      partbody: 3,
      element: 3,
      dimensionsX: 20,
      dimensionsY: 30.4,
      image: "imagefake.png"
    }

    it('should to add a new tattoo with params', function (done) {
      Element.create({element:'guitarra'}).exec(function (err, res, element){});
      TypeTattoo.create({type:'religioso'}).exec(function (err, res, typetattoo){});
      BodyPart.create({part:'brazo'}).exec(function (err, res, bodypart){});

      request(sails.hooks.http.app)
        .post('/tattoo/add')
        .send(mockTattooInster)
        .expect(200, done);
    });
    it('should get all tattoos', function (done) {
      request(sails.hooks.http.app)
        .get('/tattoo/get')
        .set('Accept', 'application/json')
        .expect(function(res) {
          assert.notEqual(res.body[0].hasOwnProperty('id'), null);
          assert.equal(res.body[0].name, mockTattooInster.name);
          assert.equal(res.body[0].tattootype.id, mockTattooInster.tattootype);
          assert.equal(res.body[0].partbody.id, mockTattooInster.partbody);
          assert.equal(res.body[0].element.id, mockTattooInster.element);
          assert.equal(res.body[0].dimensionsY, mockTattooInster.dimensionsY);
          assert.equal(res.body[0].dimensionsX, mockTattooInster.dimensionsX);
          assert.equal(res.body[0].publicate, mockTattooInster.publicate);
          assert.equal(res.body[0].image, mockTattooInster.image);
        })
        .expect(200, done);
    });

    it('should update a Tattoo', function (done) {
      Element.create({element:'arbol'}).exec(function (err, res, element){});
      TypeTattoo.create({type:'dark'}).exec(function (err, res, typetattoo){});
      BodyPart.create({part:'codo'}).exec(function (err, res, bodypart){});

      request(sails.hooks.http.app)
        .post('/tattoo/update')
        .send(mockTattooUpdate)
        .expect(function(res){})
        .expect(200, done);
    });
    it('should get a Tattoo', function (done) {

      request(sails.hooks.http.app)
        .post('/tattoo/getOne')
        .send({idreq: mockTattooUpdate.id})
        .expect(function(res) {
          assert.equal(res.body.id, mockTattooUpdate.id);
          assert.equal(res.body.name, mockTattooUpdate.name);
          assert.equal(res.body.tattootype.id, mockTattooUpdate.tattootype);
          assert.equal(res.body.partbody.id, mockTattooUpdate.partbody);
          assert.equal(res.body.element.id, mockTattooUpdate.element);
          assert.equal(res.body.dimensionsY,mockTattooUpdate.dimensionsY);
          assert.equal(res.body.dimensionsX, mockTattooUpdate.dimensionsX);
          assert.equal(res.body.publicate, mockTattooUpdate.publicate);
          assert.equal(res.body.image, mockTattooUpdate.image);
        })
        .expect(200, done);
    }); 
    it('should delete a Tattoo', function (done) {
      request(sails.hooks.http.app)
      .delete('/tattoo/delete')
      .send({id: mockTattooUpdate.id})
      .expect(200, done);
    }); 
    it('Should get a []', function (done) {
      Tattoo.create(mockTattooInster).exec(function (err, res, tattoo){});
      request(sails.hooks.http.app)
        .post('/tattoo/getOne')
        .send({idreq: mockTattooUpdate})
        .expect([])
        .expect(200, done);

      TypeTattoo.destroy({type:'dark'}).exec(function (err, res, typetattoo){});
      TypeTattoo.destroy({type:'religioso'}).exec(function (err, res, typetattoo){});
    }); 
    
  });

});

