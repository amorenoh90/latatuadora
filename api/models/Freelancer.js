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
  		type: "string"
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
  	}

  }
};

