module.exports = {
    send: function (values, done) {
        var api_key = 'key-eb656047b090ea091ef7c5d2fbd83dc5';
        var domain = 'sandbox3bfa1334fbee4dcca5b08a9b34b46337.mailgun.org';
        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
         
        var data = {
          from: 'latatuadora@latatuadora.com',
          to: values.to,
          subject: values.subject,
          text: values.text
        };       
        mailgun.messages().send(data, function (err, body) {
            if(err){
                done(err)
            }
            else{
                var message = { "message": "email sended"}
                done(null , message);
            }
        });
    }
}   