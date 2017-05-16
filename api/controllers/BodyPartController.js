/**
 * BodyPartController
 *
 * @description :: Server-side logic for managing Bodyparts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    var part={
      part: req.body.part
    }
    BodyPart.create(part).exec(function (err, records) {
      if (err) {
        res.send(500, 'Error');
      }
      else { // For check new BodyPart in DB
            BodyPart.findOne(part).exec(function (err, record) {
              if(err) res.send(500, 'Error');
              if(!record) res.send(404, "Could not find BodyPart")
              else res.send(200, 'nice');
            })
      }
    });
  }

};

