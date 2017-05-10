/**
 * TattooController
 *
 * @description :: Server-side logic for managing tattoos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    Tattoo.create({tatuaje: 1, bodyPart: 'Pie', element:'Tierra', dimensionsX:12.5, dimensionsY:10.5}).exec(function (err, records) {
      if (err) {
        res.send(500, 'Error');
      } else {
        console.log(records, 'enriquelc-----');
        res.send(200, 'nice');
      }
    });
  },
  allTattoos: function (req, res) {
    Tattoo.find()
      .populate('tatuaje')
      .exec(function(err, tattoos) {
        if(err) {
          res.send('error');
        }
        res.send(tattoos);
      });
  }
};

