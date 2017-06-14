
/**
 * Style.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


module.exports = {
  identity: 'Style',

  attributes: {
    name: {
      type: 'string',
      alphanumeric: true,
      maxLength: 40,
    },
    tattoos: {
      collection: 'tattoo',
      via: 'style'
    },
    calculatorText: {
    	 type: "string"
    },
    quotation: {
    	type: "boolean",
    	defaultsTo: false
    },
    imgUrl : {
    	type: "string"
    }
  }
};