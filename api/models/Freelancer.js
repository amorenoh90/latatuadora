/**
 * Freelancer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var constants = require('../Constants.js');
module.exports = {

  attributes: {
    name: {
      type: "string",
      required: true
    },
    published: {
      type: "string",
      default: false
    },
    about: {
      type: "text"
    },
    rank: {
      type: "float",
      defaultsTo: 1.0
    },
    count: {
      type: "integer",
      defaultsTo: 1
    },
    totalSum: {
      type: "integer",
      defaultsTo: 1
    },
    user: {
      model: 'User'
    },
    profileImgUrl: {
      type: "string"
    },
    zone: {
      collection: "Zone",
      via: "freelancerId"
    },
    canGoHome: {
      type: "boolean"
    },
    membership: {
      model: 'Memberships'
    },
    membershipExp: {
      type: "datetime"
    },
    styles: {
      collection: "FreelanceStyle",
      via: "freelanceId"
    },
    tattoos: {
      collection: "Tattoo",
      via: "freelancer"
    },
    websiteUrl: {
      type: "text"
    },
    fbUrl: {
      type: "text"
    },
    twUrl: {
      type: "text"
    },
    insUrl: {
      type: "text"
    }
  },
  tableName: 'Freelancer',
  beforeCreate: function (values, cb) {
    values.membership = constants.memberships.freelancer;
    cb();
  },
  addProfileImg: function (image, freelancer, cb) {
    image('profileImg').upload({
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, 'assets/Freelancer/images')
    }, function (err, uploadedFiles) {
      if (err)
        cb(err);
      else {
        if (uploadedFiles.length === 0) {
          return cb();
        } else {
          Freelancer.update({
              id: freelancer
            }, {
              profileImgUrl: uploadedFiles[0].fd
            })
            .exec(function (err, updated) {
              if (err) {
                return cb(err);
              } else {
                return cb();
              }
            });
        }
      }
    });
  },
  beforeUpdate: function (values, cb) {
    if (values.totalSum && values.count) {
      values.rank = values.totalSum / values.count;
    }
    cb();
  }
};
