const constants = require('../Constants');
module.exports = {
  send: function (req, res) {
    EmailService
      .send(req.body, function (error, result) {
        if (error) {
          res.serverError({
            error: error
          });
        } else {
          res.send({
            message: constants.messages.EMAIL_SENT
          });
        }
      });
  },
};
