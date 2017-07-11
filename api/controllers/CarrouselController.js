/**
 * CarrouselController
 *
 * @description :: Server-side logic for managing Carrousels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function (req, res) {
    if(req.file){
      var values = req.body;
      values.file = req.file;
      Carrousel.create(values).exec(function (err, carrousel){
        if (err) { 
          return res.serverError(err); 
        }
        else{
          return res.send(carrousel);
        }
      });
    }
    else{
      res.badRequest("Image Required");
    }
  } 
};