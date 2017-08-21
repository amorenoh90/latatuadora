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
  }
};

