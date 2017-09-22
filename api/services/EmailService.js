var send = function (values, done) {
  // var api_key = 'key-5de07e0e2df132f47cfade8f2e52b89a';
  // var domain = 'sandbox066fdbbdf16943069d9b0c3f92882717.mailgun.org';
  var api_key = 'key-5de07e0e2df132f47cfade8f2e52b89a';
  var domain = 'https://api.mailgun.net/v3/mg.neopraxis.mx';
  var mailgun = require('mailgun-js')({
    apiKey: api_key,
    domain: domain
  });
  var contentHtml;

  //var toRecipients = ['latatuadora@latatuadora.com', (values.to || '')].join(",");
  //var toRecipients = ['alberto@blick.mx', (values.to || '')].join(",");
  var toRecipients = ['dyll240719@gmail.com', (values.to || '')].join(",");

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
    if (done) {
      if (err) {
        done(err, null)
      } else {
        var message = {
          "message": "email sended"
        };
        done(null, message);
      }
    }
  });
};

module.exports = {
  sendUserWelcomeMail: function (values, done) {
    values.template = 'welcome-user.ejs';
    values.subject = "Bienvenido a la tatuadora";
    return send(values, done);
  },
  sendStudioWelcomeMail: function (values, done) {
    values.template = 'welcome.ejs';
    return send(values, done);
  },
  sendAdminWelcomeMail: function (values, done) {
    values.template = 'welcome.ejs';
    return send(values, done);
  },
  sendStudioQuotation: function (values, done) {
    values.template = 'quotation-studio-freelance.ejs';
    values.subject = "COTIZACION #" + values.model.quotation.id;
    return send(values, done);
  },
  sendAdminQuotation: function (values, done) {
    values.template = 'quotation-latatuadora.ejs';
    values.subject = "COTIZACION #" + values.model.quotation.id;
    if (values.model.quotation.minAmount && values.model.quotation.maxAmount) {
      values.subject = values.subject + " RANGO DE PRECIO: " + values.model.quotation.minAmount + " - " + values.model.quotation.maxAmount;
    }
    return send(values, done);
  },
  sendUserQuotation: function (values, done) {
    values.template = 'quotation-user.ejs';
    if (values.model.quotation.studio) {
      values.subject = "Tu cotización se ha enviado con éxito al estudio: " + values.model.quotation.studio.name;
    } else if (values.model.quotation.freelancer) {
      values.subject = "Tu cotización se ha enviado con éxito al tatuador independiente: " + values.model.quotation.freelancer.name;
    } else {
      values.subject = "Tu cotización se ha enviado con éxito";
    }

    return send(values, done);
  }
};
