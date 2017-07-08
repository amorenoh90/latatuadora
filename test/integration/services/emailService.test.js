var mocha = require("mocha");
var assert = require("assert");

describe('emailService', function() {

  var mockinfo = {
        to: 'edwin@blick.mx',
        subject: "Test Email Service",
        text: 'mock Text'
      };
    it("should logup a normal User (prerequisites)", function (done) {
      emailService.send(mockinfo, function (err, email) {
        if(err){
            done(err);
        }
        else{
            assert.equal(email.message, "email sended");
            done();
        }
      })
    });
    
});   