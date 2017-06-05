/**
 * Artist.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    userId:{
      model: "user",
      required: true
    },
    avatarUrl:{
      type: "string"
    },
    description:{
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
      via: 'element'
    },
    votes:{
      type: "string"
    },
    studioId:{
      model: "studio"
    }
  }
};

