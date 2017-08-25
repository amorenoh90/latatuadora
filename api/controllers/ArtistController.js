/**
 * ArtistController
 *
 * @description :: Server-side logic for managing Artists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update: function (req, res) {
    var values = req.body;
    if (req.file) {
      values.file = req.file;
    }
    Artist.update({id: values.id}, values).exec(function afterwards(err, updated) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.send(updated);
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
        totalSum: artist.totalSum + parseFloat(0)
      };
      Artist.update(query, updatedProperties).then(function (updatedArtist) {
        Studio.updateStudioRankBasedOnArtists(updatedArtist.id, function(updatedStudio) {
          return res.send(artist);
        });
      });
    }).catch(function (err) {
      return res.serverError(err);
    });
  }
};
