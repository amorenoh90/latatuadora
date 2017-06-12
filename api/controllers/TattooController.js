/**
 * TattooController
 *
 * @description :: Server-side logic for managing tattoos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
    add: function(req, res) {
        Tattoo.create(req.body).exec(function (err, tattoo){
          if (err) { 
            return res.serverError(err); 
          }
          else{
            Tattoo.addImg(req.file, tattoo.id, function (err, done) {
              if(err){
                res.badRequest(err);
              }
              else{
                if(done === null){
                  return res.send([tattoo])
                }
                else{
                  return res.send(done)
                }
              }
            })
          }
        });
    }
};