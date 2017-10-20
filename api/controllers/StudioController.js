/**
 * StudioController
 *
 * @description :: Server-side logic for managing Studios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var constants = require('../Constants.js');
module.exports = {
  find: function (req, res) {
    Studio.find({
      status: constants.studioStatus.publicate
    }).exec(function (err, studios) {
      if (err) {
        return res.serverError(err);
      } else {
        res.send(studios);
      }
    });
  },

  rateStudio: function (req, res) {
    var values = {
      id: req.query.id,
      rank: (req.query.rank || 0)
    };

    var query = {
      status: constants.studioStatus.publicate,
      id: values.id
    };
    Studio.findOne(query).then(function (studio) {
      var updatedProperties = {
        count: studio.count + 1,
        totalSum: studio.totalSum + parseFloat(values.rank)
      };
      Studio.update(query, updatedProperties).then(function (result) {
        return res.send(result);
      });
    }).catch(function (err) {
      return res.serverError(err);
    });
  },

  getAll: function (req, res) {
    StudioService
      .getAll({
        input: req.allParams()
      }, function (err, result) {
        if (err) {
          res.serverError({
            err: err,
            message: result.messages.pop()
          });
        } else {
          res.send({
            studios: result.json_response.studios
          });
        }
      });
  },

  getNearby: function (req, res) {
    StudioService
      .getNearby({
        input: req.allParams()
      }, function (err, result) {
        if (err) {
          res.serverError({
            err: err
          });
        } else {
          res.send({
            studios: result.json_response.studios
          });
        }
      });
  },

  getPaid: function (req, res) {
    StudioService
      .getPaid({
        input: req.allParams()
      }, function (err, result) {
        if (err) {
          res.serverError({
            err: err
          });
        } else {
          if (result.json_response.paid_jobbers.length < 1) {
            res.send({
              message: result.messages.pop()
            });
          } else {
            res.send({
              paid_jobbers: result.json_response.paid_jobbers
            });
          }

        }
      });
  },

  getArtists: function (req, res) {
    StudioService
      .getArtists({
        input: req.allParams()
      }, function (err, result) {
        if (err) {
          res.serverError({
            err: err
          });
        } else {
          if (result.json_response.artists.length < 1) {
            res.send({
              message: result.messages.pop()
            });
          } else {
            res.send({
              artists: result.json_response.artists
            });
          }
        }
      });
  }
};
