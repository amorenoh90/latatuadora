/**
 * BodyPart.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'BodyPart',

  attributes: {
    id: {
      type: "integer",
      primaryKey: true
    },
    part: {
      type: 'string',
      size: 40
    },
    bodypart: {
      collection: 'tattoo',
      via: 'partbody'
    }
  }
};

