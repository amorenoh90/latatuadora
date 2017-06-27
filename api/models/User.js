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
      required: true
    },
    lastname: {
      type: "string",      
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
    id: {
      autoIncrement: true,
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    telephone:{
      type: "integer",      
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
  },
  signUp: function (values, cb) {
    User.create(values).exec(cb);
  },
  attemptLogin: function (values, cb) {
    User.findOne({ email: values.email }).exec(function (err, user){
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb();
      }
      else{
        bcrypt.compare(values.password, user.password, function (err, res) {
          if(err){
            return cb(err);
          }
          if(res){
            return cb(null, user);
          }
          else{
            return cb();
          }
        })
      }
    });
  }
};

