/**
 * Artist.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type: 'String'
    },
    avatarUrl:{
      type: "string"
    },
    bio:{
      type: "string",
      maxLength: 100
    },
    rating:{
      type: "string"
    },
    responseTime:{
      type: "string"
    },
    completeTattoos: {
      collection: 'tattoo',
      via: 'artistId'
    },
    Flashes: {
      collection: 'Flash',
      via: 'artistId'
    },
    styles:{
      collection: "artiststyle",
      via : "artistId"
    },
    votes:{
      type: "string"
    },
    studio:{
      model: "studio"
    },
    freelancerId:{
      model: "freelancer"
    },
    artisttype:{
      model: "artisttype"
    },
    score:{
      collection: "score",
      via: "artistId"
    }
  },
  beforeUpdate : function (values, cb) {
    if(values.file){
      Artist.uploadAvatar(values, function (avatar) {
        cb();
      })
    }
    else{
     cb(); 
    }
  },
  uploadAvatar: function (values, cb) { 
    values.file('avatar').upload({
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, 'assets/Artist/images')
    },function (err, uploadedFiles) {
      if (err)
        cb(err);
      else{
        if(uploadedFiles.length === 0){
          return cb();
        }
        else{
          values.avatarUrl = uploadedFiles[0].fd;
          cb();
        }
      }
    });
  }
};

