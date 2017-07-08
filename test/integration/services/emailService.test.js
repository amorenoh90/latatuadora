var mocha = require("mocha");
var assert = require("assert");

describe('emailService', function() {

  var mockemail = {
        to: 'edwin@blick.mx',
        subject: "Test Email Service",
        text: 'mock Text'
      };
    it("should send an email", function (done) {
      this.timeout(5000);
      emailService.send(mockemail, function (err, email) {
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