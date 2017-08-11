/**
 * FavoriteFlashController
 *
 * @description :: Server-side logic for managing Favoriteflashes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    FavoriteFlash.findOrCreate({
      userId: req.headers.user.id,
      flashId: req.body.flashId
    }).exec(function (err, favorite) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send({message: 'favorite is added'});
      }
    });
  },
  consult: function (req, res) {
    FavoriteFlash.find({userId: req.headers.user.id}).populate('flashId').exec(function (err, favorites) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send(favorites);
      }
    });
  },
  remove: function (req, res) {
    FavoriteFlash.destroy({
      userId: req.headers.user.id,
      flashId: req.body.flashId
    }).exec(function (err) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.send({message: 'favorite is removed'});
      }
    });
  }
};
