/**
 * TypeTattoo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'TypeTattoo',

  attributes: {
    id: {
      type: "integer",
      primaryKey: true
    },
    type: {
      type: 'string',
      size: 40
    },
    tattoos: {
      collection: 'tattoo',
      via: 'tattootype'
    }
  }
};

