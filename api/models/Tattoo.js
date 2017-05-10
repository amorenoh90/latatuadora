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
      type: 'string',
      size: 40
    },
    style: {
      type: 'string',
      size: 40
    },
    bodyPart:{
      type: 'string',
      size: 40
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
    tatuaje: {
      model: 'typetattoo'
    }
  }
};

