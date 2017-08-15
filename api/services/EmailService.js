module.exports = {
  send: function (values, done) {
    var api_key = 'key-5de07e0e2df132f47cfade8f2e52b89a';
    var domain = 'sandbox066fdbbdf16943069d9b0c3f92882717.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
    
    var data = {
      from: 'latatuadora@latatuadora.com',
      to: values.to,
      subject: values.subject,
      text: values.text
    };
    mailgun.messages().send(data, function (err, body) {
      if (err) {
        done(err)
      }
      else {
        var message = {"message": "email sended"}
        done(null, message);
      }
    });
  }
}
