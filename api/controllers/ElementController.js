const constants = require('../Constants');
module.exports = {
  getAll: function (req, res) {
    ElementService
      .getAll({}, function (error, result) {
        if (error) {
          res.serverError({
            error: error
          });
        } else {
          res.send({
            elements: result
          });
        }
      });
  },
};
