/**
 * TattooController
 *
 * @description :: Server-side logic for managing tattoos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    Tattoo.create({tattootype: 1, partbody: 1, element:1, dimensionsX:12.5, dimensionsY:10.5}).exec(function (err, records) {
      if (err) {
        res.send(500, 'Error');
      } else {
        console.log(records, 'enriquelc-----');
        res.send(200, 'nice');
      }
    });
  },
  allTattoos: function (req, res) {
    Tattoo.find().populate('partbody').populate('tattootype').populate('element')
      .exec(function(err, tattoos) {
        if(err) {
          res.send('error');
        }
        res.send(tattoos);
      });
  }
};

