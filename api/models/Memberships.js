/**
 * Memberships.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var constants = require('../Constants.js');
var paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox', //sandbox or live 
  'client_id': 'AWCKGzQv2c29C-zyzlEFpAz5GljvGPbXqSptzJw7V4BuEQFMle3j54kYPFQLM-z-ug-IycznJvdngzns',
  'client_secret': 'EKOvENrICZilSHCE44wTyVZZQbwDsBoY5Hzk_UTbAW4LG3WLOtC79zbMZz7UTCLzAPnL7lNDvUGhmMZH'
});
module.exports = {
  attributes: {
    userTypeId: {
      model: 'usertype'
    },
    amount: {
      type: 'float',
      required: true
    },
    recurrentId: {
      model: 'recurrent',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    conekta:{
      type: 'string'
    },
    paypal:{
      type: 'string'
    }
  },
  beforeCreate: function (values, cb) {
    ConektaService.createPlan(values, function (err, plan) {
      if(err){
        return cb(err);
      }
      else{
        values.conekta = plan.id;
        console.log(values);
      }
    });
    var billingPlanAttributes = {
      "description": values.description,
      "name": values.name,
      "payment_definitions": [
        {
          "amount": {
            "currency": "MXN",
            "value": values.amount
          },
          "cycles": "0",
          "frequency": "YEAR",
          "frequency_interval": "1",
          "name": "Regular",
          "type": "REGULAR"
        }
      ],
      "type": "INFINITE",
      "merchant_preferences": {
        "auto_bill_amount": "yes",
        "cancel_url": constants.payPalUrls.cancelplan,
        "initial_fail_amount_action": "cancel",
        "max_fail_attempts": "3",
        "return_url": constants.payPalUrls.aceptplan
      }
    };
    var billingPlanUpdateAttributes = [{
      "op": "replace",
      "path": "/",
      "value": {
        "state": "ACTIVE"
      }
    }];
    paypal.billingPlan.create(billingPlanAttributes, function (err, billingPlan) {
      if (err) {
        cb(err);
      } 
      else {
        paypal.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, 
            function(error, response){
            if (error) {
                throw cb(error);
            } 
            else {
              console.log(response);
              values.paypal = billingPlan.id;
              cb();
            }
        });
      }
    });
  }
};