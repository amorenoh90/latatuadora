/**
 * AddressController
 *
 * @description :: Server-side logic for managing Artists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  studioAddress: function (req, res) {
    var values = req.query;
    Studio.findOne({id: values.id}).then(function (results) {
      Address.findOne({id: results.addressId}).populate("stateId").populate("suburbId").populate("townId").exec(function (err, addressResult) {
        if (err) return err;
        return res.send(addressResult);
      });
    }).catch(function (err) {
      return res.serverError(err);
    });
  },
  freelanceAddress: function (req, res) {
    var values = req.query;
    Freelancer.findOne({id: values.id}).then(function (results) {
      Address.findOne({id: results.addressId}).populate("stateId").populate("suburbId").populate("townId").exec(function (err, addressResult) {
        if (err) return err;
        return res.send(addressResult);
      });
    }).catch(function (err) {
      return res.serverError(err);
    });
  },
  userAddress: function (req, res) {
    var values = req.query;
    User.findOne({id: values.id}).then(function (results) {
      Address.findOne({id: results.addressId}).populate("stateId").populate("suburbId").populate("townId").exec(function (err, addressResult) {
        if (err) return err;
        return res.send(addressResult);
      });
    }).catch(function (err) {
      return res.serverError(err);
    });
  },
  states: function (req, res) {
    State.find().then(function (results) {
      res.send(results);
    });
  },
  suburbs: function (req, res) {
    var stateId = req.param('stateId');
    Suburb.find({stateId: stateId}).then(function (results) {
      res.send(results)
    });
  },
  towns: function (req, res) {
    var townQuery = "select town.id, town.name from Town as town where lower(town.name) like ?";
    var townName = req.param('name') || '';
    townName = "%" + townName.toLowerCase().trim() + "%";
    var escapedValues = [townName];
    Town.query(townQuery, escapedValues, function (err, results) {
      if (err) return res.serverError(err);
      res.send(results);
    })
  },
};

