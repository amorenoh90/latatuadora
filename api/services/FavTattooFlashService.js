module.exports = {
  find: function (values, done) {
    var favs = {};
    FavoriteFlash.find({userId: values.user.id}).populate('flashId')
      .then(function (favorites) {
        favs.flashes = favorites;
        return favs;
        console.log("flash", favs);
      })
      .then(function (favs) {
        FavoriteTattoo.find({userId: values.user.id}).populate('tattooId')
          .exec(function (err, favtattoo) {
            if (err) {
              return done(err);
            } else {
              favs.tattoos = favtattoo;
              return done(null, favs);
            }
          });
      })
      .catch(function (err) {
        return done(err);
      });
  }
};
