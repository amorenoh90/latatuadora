/**
 * QuotationReferences.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  
  attributes: {
    imgUrl: {
      type: 'string',
      required: true
    },
    quotation: {
      model: "Quotation",
      required: true
    }
  },
  tableName: 'QuotationReferences'
};

