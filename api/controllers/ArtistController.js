/**
 * ArtistController
 *
 * @description :: Server-side logic for managing Artists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function (req, res) {
    var values = req.body;
    if(req.file){
      values.file = req.file;
    }
    Artist.update({id: values.id},values).exec(function afterwards(err, updated){
      if (err) {
        return res.negotiate(err);
      }
      else{
        return res.send(updated);
      }
    }); 
  }
};