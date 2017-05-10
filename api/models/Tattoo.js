/**
 * Tattoo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'Tattoo',
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    element: {
      model: "element"
    },
    partes:{
      model: 'bodypart'
    },
    dimensionsX: {
      type: 'float',
      size: 5
    },
    dimensionsY: {
      type: 'float',
      size: 5
    },
    image: {
      type: 'string',
      size: 40
    },
    tipotatuaje: {
      model: 'typetattoo'
    },
    publicate: {
      type: 'boolean'
    }
  }
};

