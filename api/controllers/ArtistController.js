/**
 * ArtistController
 *
 * @description :: Server-side logic for managing Artists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function (req, res) {
    var values = req.allParams();

    if (req.file) {
      values.file = req.file;
    }
    if (!values.awards) {
      values.awards = [];
    } else {
      if ((typeof values.awards) != "object") values.awards = JSON.parse(values.awards);
    }

    if (!values.styles) {
      values.styles = [];
    } else {
      if ((typeof values.styles) != "object") values.styles = JSON.parse(values.styles);
    }

    if (!values.tattoos) {
    } else {
      if ((typeof values.tattoos) != "object") values.tattoos = values.tattoos.split(",").map(Number);
    }

    var tattoos = values.tattoos;
    delete values.tattoos;
    Artist.create(values).exec(function afterwards(err, updated) {
      if (err) {
        return res.negotiate(err);
      } else {
        var doQuery = async () => {
          if (tattoos) await Tattoo.update({id: tattoos}, {artist: updated.id});

          updated = await Artist.find({id: updated.id}).populateAll();
          updated = updated[0];
          return res.send(updated);
        };

        doQuery();
      }
    });
  },
  get: function (req, res) {
    var values = req.allParams();

    var doQuery = async () => {
      var artist = await Artist
        .find({
          id: values.id
        })
        .populateAll();

      return res.send(artist);
    };

    doQuery();
  },
  update: function (req, res) {
    var values = req.allParams();
    if (req.file) {
      values.file = req.file;
    }

    if (values.awards) if ((typeof values.awards) != "object") values.awards = JSON.parse(values.awards);
    if (values.tattoos) values.tattoos = values.tattoos.split(",");
    if (values.styles) if ((typeof values.styles) != "object") values.styles = JSON.parse(values.styles);


    Artist.update({id: values.id}, values).exec(function afterwards(err, updated) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.send(updated);
      }
    });
  },
  delete: function (req, res) {
    var values = req.body;
    if (req.file) {
      values.file = req.file;
    }
    Artist.destroy({id: values.id}).exec(function afterwards(err, deleted) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.send(deleted);
      }
    });
  },
  rateArtist: function (req, res) {
    var values = {
      id: req.query.id,
      rank: (req.query.rank || 0)
    };

    var query = {
      id: values.id
    };

    Artist.findOne(query).then(function (artist) {
      var updatedProperties = {
        count: artist.count + 1,
        totalSum: artist.totalSum + values.rank
      };
      Artist.update(query, updatedProperties).then(function (updatedArtist) {
        Studio.updateStudioRankBasedOnArtists(artist.studio, function (updatedStudio) {
          return res.send(artist);
        });
      });
    }).catch(function (err) {
      return res.serverError(err);
    });
  }
};
