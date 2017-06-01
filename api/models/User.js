/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');

module.exports = {

  attributes: {
    name: {
      type: 'string',
      maxLength: 40,
      alphanumeric: true, 
      required: true
    },
    lastname: {
      type: "string",
      alphanumeric: true
    },
    email:{
      type: 'email',
      unique: true,
      required: true
    },
    password:{
      type: "string",
      minLength: 8
    },
    certCofepris: {
      type: 'boolean',
      defaultsTo: false
    },
    id: {
      autoIncrement: true,
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    telephone:{
      type: "integer",
      maxLength: 10,
      minLength: 8
    },
    city:{
      type: "string"
    },
    userType:{
      model: "usertype"
    },
    quotation:{
      collection: "quotation",
      via: "userId"
    }
  },

  beforeCreate: function (values, cb) { 
    if(values.password){
      bcrypt.hash(values.password, 10, function(err, hash) {
        if(err) return cb(500, err);
        values.password = hash;
        cb();
      });
    }
    else{
      cb();
    }
  }
};

