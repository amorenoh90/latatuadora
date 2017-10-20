/**
 * FavoriteTattooController
 *
 * @description :: Server-side logic for managing Favoritetattoos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    FavoriteTattoo.findOrCreate({
      userId: req.headers.user.id,
      tattooId: req.body.tattooId
    }).exec(function (err, favorite) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send({message: 'favorite is added'});
      }
    });
  },
  consult: function (req, res) {
    FavoriteTattoo.find({userId: req.headers.user.id}).populate('tattooId').exec(function (err, favorites) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send(favorites);
      }
    });
  },
  remove: function (req, res) {
    FavoriteTattoo.destroy({
      userId: req.headers.user.id,
      tattooId: req.body.tattooId
    }).exec(function (err) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.send({message: 'favorite is removed'});
      }
    });
  },
  countFavorites: function (req, res) {
    var values = {
      tattooId: req.query.tattooId
    };
    FavoriteTattoo.count(values).then(function (numberOfFavorites) {
      res.send({count: numberOfFavorites});
    }).catch(function (err) {
      res.serverError(err);
    });
  }
};

