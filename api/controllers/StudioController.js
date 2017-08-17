/**
 * StudioController
 *
 * @description :: Server-side logic for managing Studios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var constants = require('../Constants.js');
module.exports = {
  find: function (req, res) {
    Studio.find({status: constants.studioStatus.publicate}).exec(function (err, studios) {
      if (err) {
        return res.serverError(err);
      } else {
        res.send(studios);
      }
    });
  }
};

