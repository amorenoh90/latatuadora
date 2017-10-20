/**
 * Quotation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  attributes: {
    dimensionsX: {
      type: 'float',
      size: 5,
      required: true
    },
    dimensionsY: {
      type: 'float',
      size: 5,
      required: true
    },
    styleId: {
      model: 'Style'
    },
    comments: {
      type: "string",
      maxLength: 265
    },
    userId: {
      model: "User"
    },
    freelancerId: {
      model: "Freelancer"
    },
    references: {
      collection: 'QuotationReferences',
      via: 'quotation'
    },
    bodypartId: {
      model: 'BodyPart'
    },
    studioId: {
      model: 'Studio'
    },
    used: {
      type: "boolean",
      defaultsTo: false
    },
    id: {
      autoIncrement: true,
      type: 'integer',
      unique: true,
      primaryKey: true
    }
  },
  tableName: 'Quotation'
};
