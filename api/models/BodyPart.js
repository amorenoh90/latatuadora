/**
 * BodyPart.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  attributes: {
    name: {
      type: 'string',
      size: 40
    },
    section : { // describes front/back
      type: "integer"
    },
    path: {
      type: 'string'
    },
    tattos: {
      collection: 'Tattoo',
      via: 'partbody'
    }
  },
  tableName: 'BodyPart'
};

