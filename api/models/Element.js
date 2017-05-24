/**
 * Element.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  identity: 'Element',

  attributes: {
    id: {
      type: "integer",
      primaryKey: true
    },
    element: {
      type: 'string',
      size: 40
    },
    elemento: {
      collection: 'tattoo',
      via: 'element'
    }
  }
};
