/**
 * ElementController
 *
 * @description :: Server-side logic for managing Elements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    var newelement= {
      element: req.body.element
    }
    Element.create(newelement).exec(function (err, records) {
      if (err) {
        res.send(500, 'Error');
      }
      else { // For check new Element in DB
         Element.findOne(newelement).exec(function (err, record) {
          if (err) res.send(500, 'Error');
          if (!record) res.send(404, "Could not find Element")
          else res.send(200, 'nice');
         });
      }
    });
  },

};

