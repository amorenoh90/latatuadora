var mocha = require("mocha");
var assert = require("assert");

describe('EmailService', function () {
  
  var mockemail = {
    to: 'alberto@blick.mx',
    subject: "Test Email Service",
    text: 'mock Text',
    model: {
      user: {
        name: "Juan Alberto"
      }
    }
  };
  it("should send a welcome email", function (done) {
    EmailService.sendUserWelcomeMail(mockemail, function (err, email) {
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
