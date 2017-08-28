module.exports = {
  add: function (req, res) {
    FavoriteFreelancer.findOrCreate({
      user: req.headers.user.id,
      freelancer: req.body.freelancer
    }).exec(function (err, favorite) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send({message: 'favorite is added'});
      }
    });
  },
  consult: function (req, res) {
    FavoriteFreelancer.find({user: req.headers.user.id}).populate('freelancer').exec(function (err, favorites) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send(favorites);
      }
    });
  },
  remove: function (req, res) {
    FavoriteFreelancer.destroy({
      user: req.headers.user.id,
      freelancer: req.body.freelancer
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
      freelancer: req.query.freelancer
    };
    FavoriteFreelancer.count(values).then(function (numberOfFavorites) {
      res.send({count: numberOfFavorites});
    }).catch(function (err) {
      res.serverError(err);
    });
  }
};
