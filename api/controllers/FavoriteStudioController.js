/**
 * FavoriteStudioController
 *
 * @description :: Server-side logic for managing Favoritestudios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    FavoriteStudio.findOrCreate({
      user: req.headers.user.id,
      studio: req.body.studio
    }).exec(function (err, favorite) {
      if (err) {
        return res.serverError(err);
      }
      else {
        return res.send({message: 'favorite is added'});
      }
    });
  },
  consult: function (req, res) {
    FavoriteStudio.find({user: req.headers.user.id}).populate('studio').exec(function (err, favorites) {
      if (err) {
        return res.serverError(err);
      }
      else {
        return res.send(favorites);
      }
    });
  },
  remove: function (req, res) {
    FavoriteStudio.destroy({
      user: req.headers.user.id,
      studio: req.body.studio
    }).exec(function (err) {
      if (err) {
        return res.negotiate(err);
      }
      else {
        return res.send({message: 'favorite is removed'});
      }
    });
  }
};
