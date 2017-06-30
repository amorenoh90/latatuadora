/**
 * Created by edwin on 30/05/17.
 */
var mocha = require('mocha'),
  assert = require('assert');

describe('ItemsFinderService', function() {

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
    it("should find Items", function (done) {
      ItemsFinderService.find(mockitem, function (err, item) {
        if(err){
          done(err);
        }
        else{
          assert.equal(item.id, mockitem.itemId);
          assert.notEqual(item.amount, null);
          assert.equal(item.sell, false); 
          done();
        }
      })
    });
});