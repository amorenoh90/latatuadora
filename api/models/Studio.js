/**
 * Studio.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var constants = require('../Constants');
module.exports = {

  attributes: {
  	name:{
  		type: "string",
  		required: true
  	},
    certCofepris: {
      type: 'boolean',
      defaultsTo: false
    },
  	addressId:{
  		model: "address"
  	},
  	publication:{
  		type: "datetime"
  	},
  	titleImgUrl:{
  		type: "string"
  	},
  	logoUrl:{
      type: "string"
  	},
  	profileImgUrl:{
      type: "string"
  	},
  	about:{
  		type: "string",
  		maxLength: 250
  	},
  	userId:{
  		model: "user"
  	},
  	artist:{
  		collection: "artist",
  		via: "studio"
  	},
  	shedule:{
  		collection: "shedule",
  		via: "studioId"
  	},
    styles:{
      collection: "studiostyle",
      via: "studioId"
    },
    status:{
      model:"studiostatus"
    },
    membership:{
      model: 'memberships'
    },
    membershipExp:{
      type: "datetime"
    },
    carrousel:{
      collection: 'Carrousel',
      via: 'studio'
    }
  },
  beforeCreate: function (values, cb) {
    values.membership = constants.memberships.studio;
    cb();
  },
  addProfileImg: function (image, studio, cb) { 
    image('profileImg').upload({
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, 'assets/Studio/images')
    },function (err, uploadedFiles) {
      if (err)
        return cb(err);
      else{
        if(uploadedFiles.length === 0){
          return cb();
        }
        else{
          Studio.update({id: studio},{profileImgUrl: uploadedFiles[0].fd})
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

};

