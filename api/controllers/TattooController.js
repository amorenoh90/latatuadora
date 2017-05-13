/**
 * TattooController
 *
 * @description :: Server-side logic for managing tattoos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    var type= req.body.tattootype;
    var partbody= req.body.partbody;
    var element= req.body.element;
    var dimensionsX = req.body.dimensionsX;
    var dimensionsY = req.body.dimensionsY;
    var publicate = req.body.publicate;
    var newtattoo={
      tattootype: type,
      partbody: partbody,
      element: element,
      dimensionsX: dimensionsX,
      dimensionsY: dimensionsY,
      publicate: publicate
    }

    Tattoo.create(newtattoo).exec(function (err, records){
      if (err) {
        res.send(500, 'Error');
      } else {
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

