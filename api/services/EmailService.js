var send = function (values, done) {
  var api_key = 'key-5de07e0e2df132f47cfade8f2e52b89a';
  var domain = 'sandbox066fdbbdf16943069d9b0c3f92882717.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
  var contentHtml;
  
  //var toRecipients = ['latatuadora@latatuadora.com', (values.to || '')].join(",");
  var toRecipients = ['alberto@blick.mx', (values.to || '')].join(",");
  
  if (values.template) {
    contentHtml = TemplateService.retrieveContent(values.template, values.model);
  }
  
  var data = {
    from: 'latatuadora@latatuadora.com',
    to: toRecipients,
    subject: values.subject,
    html: contentHtml ? contentHtml : values.text
  };
  mailgun.messages().send(data, function (err, body) {
    if (err) {
      done(err)
    }
    else {
      var message = {"message": "email sended"};
      done(null, message);
    }
  });
};

module.exports = {
  sendWelcomePage: function (values, done) {
    values.template = 'welcome.ejs';
    return send(values, done);
  },
  sendQuotation: function (values, done) {
    values.template = 'quotation.ejs';
    return send(values, done);
  }
  // TODO read and use templates for content in emails
}
