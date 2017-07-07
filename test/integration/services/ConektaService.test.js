var mocha = require('mocha'),
  assert = require('assert');

describe('Conekta Service', function() {

  var mockitem = {
        itemType: 1,
        itemId: 1,
      },
      mockflash = {
        amount: 300.00,
        sizeId: 1,
        significant: 'mylife',
        artistId: 1,
        copyrigth: true,
        styleId: 1,
        elementId: 2
      },
      mockplan = {
        name: 'mockplan',
        amount: 3500
      };
    it("should logup a Studio User (prerequisites)", function (done) {
      request(sails.hooks.http.app)
      .post('/logup')
      .send(mockstudio)
      .expect(function(res) {
        mockstudio.token = res.body.token;
        assert.notEqual(res.body, null);
      })
      .expect(200, done);
    });
    it("add flash (prerequisites)", function (done) {
      Flash.create(mockflash).exec(function (err, flash){
        if (err) {
          return done(err); 
        }
        else{
          mockitem.itemId = flash.id;
          mockflash.id = flash.id;
          return done();
        }
      });
    });
    it('should create a new conekta plan', function (done) {
      ConektaService.createPlan(mockplan, function (err, plan) {
        if(err){
          done(err);
        }
        else{
          done();
        }
      });
    });
    it('subscribe Studio to plan', function (done) {
      ConektaService.createSubscription(mockstudio ,function (err, subscription) {
        if(err){
          done(err);
        }
        else{
          console.log(subscription);
          done();
        }
      });
    });
});