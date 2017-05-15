/**
 * ElementController
 *
 * @description :: Server-side logic for managing Elements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    Element.create({element: "agua"}).exec(function (err, records) {
      if (err) {
        res.send(500, 'Error');
      } else {
        console.log(records, 'enriquelc-----');
        res.send(200, 'nice');
      }
    });
  },

};

