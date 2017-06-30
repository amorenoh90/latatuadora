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
    			console.log(plan);
    			done();
    		}
    	})
    })
});