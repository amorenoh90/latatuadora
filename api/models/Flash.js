/**
 * Flash.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    realImageUrl:{
      type: "string"
    },
    sellImageUrl:{
      type: "string"
    },
    amount:{
      type: "float"
    },
    sizeId:{
      model: "size"
    },
    significant:{
      type: "string"
    },
    artist:{
      model: "artist"
    },
    copyrigth:{
      type: "boolean"
    },
    sell:{
      type: "boolean",
      defaultsTo: false
    },
    elementId:{
      collection: "flashelement",
      via: "flashId"
    },
    styleId:{
      collection: "flashstyle",
      via: "flashId"
    },
    freelancer:{
      model:'freelancer'
    },
    studio:{
      model:'studio'
    }
  },
  addSellImg: function (image, flash, cb) { 
  image('sellImage').upload({
    maxBytes: 10000000,
    dirname: require('path').resolve(sails.config.appPath, 'assets/Flash/images')
  },function (err, uploadedFiles) {
    if (err)
      return cb(err);
    else{
      if(uploadedFiles.length === 0){
        return cb(null, null);
      }
      else{
        Flash.update({id: flash},{sellImageUrl: uploadedFiles[0].fd})
        .exec(function (err, updated){
          if (err) { 
            return cb(err); 
          }
          else{
            return cb(null, updated);
          }
        });
      }
    }
  });
  },
  addRealImg: function (image, flash, cb) { 
  image('realImage').upload({
    maxBytes: 10000000,
    dirname: require('path').resolve(sails.config.appPath, 'assets/Flash/images')
  },function (err, uploadedFiles) {
    if (err)
    return cb(err);
    else{
    if(uploadedFiles.length === 0){
      return cb(null, null);
    }
    else{
      Flash.update({id: flash},{realImageUrl: uploadedFiles[0].fd})
      .exec(function (err, updated){
        if (err) { 
        return cb(err); 
        }
        else{
        return cb(null, updated);
        }
      });
    }
    }
  });
  }
};

