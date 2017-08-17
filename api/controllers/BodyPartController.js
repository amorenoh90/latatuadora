/**
 * BodyPartController
 *
 * @description :: Server-side logic for managing Bodyparts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var find = function find(request, response) {
  BodyPart.find().then(function (bodyParts, err) {
    if (err) {
      response.serverError(err);
    } else {
      response.send(bodyParts);
    }
  });
};

module.exports = {
  find: find
};

