/**
 * Freelancer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name:{
  		type: "string",
  		required: true
  	},
  	published:{
  		type: "string",
      default: false
  	},
  	about:{
  		type: "string",
  		maxLength: 250
  	},
  	rank:{
  		type:"string"
  	},
  	profileImgUrl:{
  		type: "string"
  	},
  	zone:{
  		collection: "freelancerzone",
  		via: "freelancerId"
  	},
  	artist:{
  		collection: "artist",
  		via: "freelancerId"
  	},
    canGoHome:{
      type: "boolean"
    },
    membership:{
      model: 'memberships'
    },
    membershipExp:{
      type: "datetime"
    }
  },
  beforeCreate: function (values, cb) {
    values.membership = contstants.memberships.freelancer;
    cb();
  },
  addProfileImg: function (image, freelancer, cb) { 
    image('profileImg').upload({
      maxBytes: 10000000,
      dirname: require('path').resolve(sails.config.appPath, 'assets/Freelancer/images')
    },function (err, uploadedFiles) {
      if (err)
        cb(err);
      else{
        if(uploadedFiles.length === 0){
          return cb();
        }
        else{
          Freelancer.update({id: freelancer},{profileImgUrl: uploadedFiles[0].fd})
            .exec(function (err, updated){
              if (err) { 
                return cb(err); 
              }
              else{
                return cb();
              }
          });
        }
      }
    });
  }
};

