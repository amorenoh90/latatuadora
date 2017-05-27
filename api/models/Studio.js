/**
 * Studio.js
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
  		via: "studioId"
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
    }

  }
};

