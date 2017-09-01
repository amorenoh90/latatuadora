/**
 * Artist.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  attributes: {
    name: {
      type: 'String'
    },
    avatarUrl: {
      type: "string"
    },
    bio: {
      type: "text"
    },
    responseTime: {
      type: "string"
    },
    Flashes: {
      collection: 'Flash',
      via: 'artist'
    },
    styles: {
      collection: "ArtistStyle",
      via: "artistId"
    },
    tattoos: {
      collection: "Tattoo",
      via: "artist"
    },
    studio: {
      model: "Studio"
    },
    awards: {
      collection: "Awards",
      via: "artist"
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
    }
  },
  tableName: 'Artist',
  beforeUpdate: function (values, cb) {
    if (values.totalSum && values.count) {
      values.rank = values.totalSum / values.count;
    }
    if (values.file) {
      Artist.uploadAvatar(values, function (avatar) {
        cb();
      })
    } else {
      cb();
    }
  },
  uploadAvatar: function (values, cb) {
    values.file('avatar').upload({
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, 'assets/Artist/images')
    }, function (err, uploadedFiles) {
      if (err)
        cb(err);
      else {
        if (uploadedFiles.length === 0) {
          return cb();
        }
        else {
          values.avatarUrl = uploadedFiles[0].fd;
          cb();
        }
      }
    });
  }
};

