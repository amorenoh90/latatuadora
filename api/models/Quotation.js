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
      model: 'style'
    },
    comments: {
      type: "string",
      maxLength: 265
    },
    userId: {
      model: "user"
    },
    references: {
      collection: 'quotationreferences',
      via: 'quotation'
    },
    bodypartId: {
      model: 'bodypart'
    },
    studioId: {
      model: 'studio'
    },
    used: {
      type: "boolean",
      defaultsTo: false
    }
    
  },
  beforeCreate: function (values, cb) {
    if (values.style) {
      Style.findOne({id: values.style}).exec(function (err, style) {
        if (err) {
          return cb(err);
        }
        if (!style) {
          cb('Could not find Style, sorry.');
        }
        if (style) {
          values.style = style.id;
          cb();
        }
      });
    }
    else {
      cb();
    }
  }
};
