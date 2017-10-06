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
      model: "Element"
    },
    partbody: {
      model: 'BodyPart'
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
      type: 'text'
    },
    name: {
      type: 'text'
    },
    publicate: {
      type: 'boolean',
      defaultsTo: false
    },
    styles: {
      collection: "TattooStyle",
      via: "tattooId"
    },
    elements: {
      collection: "TattooElement",
      via: "tattooId"
    },
    artist: {
      model: 'Artist'
    },
    freelancer: {
      model: 'Freelancer'
    },
    votes: {
      type: 'integer'
    }
  },
  tableName: 'Tattoo',
  beforeCreate: function (values, cb) {
    var dirName = require('path').resolve(sails.config.appPath, 'assets/Tattoo/images');
    values.file('image').upload({
      maxBytes: 10000000,
      dirname: dirName
    }, function (err, uploadedFiles) {
      if (err)
        cb(err);
      else {
        if (uploadedFiles.length === 0) {
          return cb();
        }
        else {
          values.image = uploadedFiles[0].fd;
          cb();
        }
      }
    });
  },
  addImg: function (image, tattoo, cb) {
    var dirName = require('path').resolve(sails.config.appPath, 'assets/Tattoo/images');
    var imageFile = image('image');
    imageFile.upload({
      maxBytes: 10000000,
      dirname: dirName
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

