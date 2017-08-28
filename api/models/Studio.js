/**
 * Studio.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var constants = require('../Constants');
module.exports = {
  
  attributes: {
    name: {
      type: "string",
      required: true
    },
    certCofepris: {
      type: 'boolean',
      defaultsTo: false
    },
    addressId: {
      model: "Address"
    },
    publication: {
      type: "datetime"
    },
    titleImgUrl: {
      type: "string"
    },
    logoUrl: {
      type: "string"
    },
    profileImgUrl: {
      type: "string"
    },
    about: {
      type: "text"
    },
    userId: {
      model: "User"
    },
    artist: {
      collection: "Artist",
      via: "studio"
    },
    schedule: {
      collection: "Schedule",
      via: "studioId"
    },
    styles: {
      collection: "StudioStyle",
      via: "studioId"
    },
    status: {
      model: "StudioStatus"
    },
    membership: {
      model: 'Memberships'
    },
    membershipExp: {
      type: "datetime"
    },
    carrousel: {
      collection: 'Carrousel',
      via: 'studio'
    },
    rank: {
      type: "float",
      defaultsTo: 1.0
    },
    averageRank: {
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
  tableName: 'Studio',
  beforeCreate: function (values, cb) {
    values.membership = constants.memberships.studio;
    cb();
  },
  addProfileImg: function (image, studio, cb) {
    image('profileImg').upload({
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, 'assets/Studio/images')
    }, function (err, uploadedFiles) {
      if (err)
        return cb(err);
      else {
        if (uploadedFiles.length === 0) {
          return cb();
        }
        else {
          Studio.update({id: studio}, {profileImgUrl: uploadedFiles[0].fd})
            .exec(function (err, updated) {
              if (err) {
                return cb(err);
              }
              else {
                return cb(null, updated);
              }
            });
        }
      }
    });
  },
  beforeUpdate: function (values, cb) {
    values.rank = values.totalSum / values.count;
    cb();
  },
  updateStudioRankBasedOnArtists: function (studioId, cb) {
    Artists.find({studio: studioId}).then(function (artists) {
      var artistRank;
      var totalArtistSum = 0;
      var totalArtistCount = artists.length;
      for (var i = 0; i < totalArtistCount; i++) {
        totalArtistSum = +artists[i].rank
      }
      
      artistRank = totalArtistSum / totalArtistCount;
      
      var updatedAverageRank = {
        averageRank: artistRank
      };
      Studio.update({id: studioId}, updatedAverageRank).then(function (result) {
        cb();
      });
    });
  }
};

