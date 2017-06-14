/**
 * FavoriteTattooController
 *
 * @description :: Server-side logic for managing Favoritetattoos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
module.exports = {
    add: function (req, res) {
        FavoriteTattoo.findOrCreate({
            userId: req.body.user.id,
            tattooId: req.body.tattooId
        }).exec(function (err, favorite){
            if (err) {
                return res.serverError(err); 
            }
            else{
                return res.send({message: 'favorite is added'});
            }
        });
    },
    consult: function (req, res) {
        
    },
    remove: function (req, res) {
        FavoriteTattoo.destroy({
            userId: req.body.user.id,
            tattooId: req.body.tattooId
        }).exec(function (err){
          if (err) { 
            return res.negotiate(err); 
        }
        else{
            return res.send({message: 'favorite is removed'});
        }  
        });
    }   
};

