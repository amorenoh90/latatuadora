/**
 * Carrousel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  attributes: {
    studio: {
      model: 'Studio'
    },
    url: {
      type: 'String'
    }
  },
  beforeCreate: function (values, cb) {
    values.file('image').upload({
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
          values.url = uploadedFiles[0].fd;
          cb();
        }
      }
    });
  }
};

