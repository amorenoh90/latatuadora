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
    },
    lastname: {
      type: "string"
    },
    email: {
      type: 'email',
      unique: true,
      required: true
    },
    password: {
      type: "string",
      minLength: 8
    },
    id: {
      autoIncrement: true,
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    telephone: {
      type: "string",
    },
    userType: {
      model: "UserType"
    },
    addressId: {
      model: "Address"
    },
    quotation: {
      collection: "Quotation",
      via: "userId"
    },
    conekta: {
      type: 'string'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      delete obj.id;
      delete obj.conekta;
      delete obj.userType;
      delete obj.createdAt;
      return obj;
    }
  },
  tableName: 'User',
  beforeCreate: function (values, cb) {
    if (values.password) {
      bcrypt.hash(values.password, 10, function (err, hash) {
        if (err) {
          return cb(err);
        } else {
          values.password = hash;
          cb();
        }
      });
    } else {
      cb();
    }
  },
  beforeUpdate: function (values, cb) {
    if (values.password) {
      bcrypt.hash(values.password, 10, function (err, hash) {
        if (err) {
          return cb(err);
        } else {
          values.password = hash;
          cb();
        }
      });
    } else {
      cb();
    }
  },
  signUp: function (values, cb) {
    User.create(values).exec(cb);
  },
  attemptLogin: function (values, cb) {
    User.findOne({
      email: values.email
    }).exec(function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb();
      } else {
        bcrypt.compare(values.password, user.password, function (err, res) {
          if (err) {
            return cb(err);
          }
          if (res) {
            return cb(null, user);
          } else {
            return cb();
          }
        })
      }
    });
  }
};
