var mocha = require("mocha");
var assert = require("assert");

describe('EmailService', function () {
  
  var mockemail = {
    to: 'alberto@blick.mx',
    subject: "Test Email Service",
    text: 'mock Text'
  };
  it("should send an email", function (done) {
    EmailService.send(mockemail, function (err, email) {
      if (err) {
        done(err);
      }
      else {
        assert.equal(email.message, "email sended");
        done();
      }
    })
  });
});
