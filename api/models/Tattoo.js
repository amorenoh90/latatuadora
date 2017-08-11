/**
 * Tattoo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'Tattoo',
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    element: {
      model: "element"
    },
    partbody: {
      model: 'bodypart'
    },
    dimensionsX: {
      type: 'float',
      size: 5
    },
    dimensionsY: {
      type: 'float',
      size: 5
    },
    image: {
      type: 'string'
    },
    name: {
      type: 'string',
      size: 40
    },
    publicate: {
      type: 'boolean',
      defaultsTo: false
    },
    style: {
      model: 'style'
    },
    artist: {
      model: 'artist'
    },
    freelancer: {
      model: 'freelancer'
    },
    votes: {
      type: 'integer'
    }
  },
  addImg: function (image, tattoo, cb) {
    image('image').upload({
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, 'assets/Tattoo/images')
    }, function (err, uploadedFiles) {
      if (err)
        return cb(err);
      else {
        if (uploadedFiles.length === 0) {
          return cb(null, null);
        }
        else {
          Tattoo.update({id: tattoo}, {image: uploadedFiles[0].fd})
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
  }
};

