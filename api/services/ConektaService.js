var constants = require('../Constants');
var conekta = require('conekta');
 conekta.api_key = 'key_poWJzs7PVwgKD8eAFqdnYw';
 conekta.api_version = '2.0.0';
var paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox', //sandbox or live 
  'client_id': 'AWCKGzQv2c29C-zyzlEFpAz5GljvGPbXqSptzJw7V4BuEQFMle3j54kYPFQLM-z-ug-IycznJvdngzns',
  'client_secret': 'EKOvENrICZilSHCE44wTyVZZQbwDsBoY5Hzk_UTbAW4LG3WLOtC79zbMZz7UTCLzAPnL7lNDvUGhmMZH'
});
var request = require('request');
var comprapagotoken = 'sk_test_4327294905c54c2065';
module.exports = {
  charge: function (values, auth, done) {
    User.findOne({id: auth.id})
      .then(function (user){
        if(!user){
          return done({message: 'User not found'});
        }
        else{
          return user;
        }
      })
      .then(function (user) {
        if(user.conekta){
          PaymentsService.order(values, user, function (err, order) {
            if(err){
              return done(err);
            }
            else{
              return done(null, order);
            }
          });
        }
        else{ 
          PaymentsService.createCostumer(user, values, function (err, customer) {
            if(err){
              return done(err);
            }
            else{
              console.log(customer);
              PaymentsService.order(values, customer, function (err, order) {
                if(err){
                  return done(err);
                }
                else{
                  return done(null, order);
                }
              });
            }
          });
        }
      })
      .catch(function (err) {
        return done(err);
      });
  },
  order: function (values, user, done) {
    ItemsFinderService.find(values, function (err, item) {
      if(err){
        return done(err);
      }
      else{
        item.amount = item.amount*100;
        conekta.Order.create({
          line_items: [{
            name: item.id,
            unit_price: item.amount,
            quantity: 1
          }],
          currency: "MXN",
          customer_info: {
            customer_id: user.conekta
          },
          charges: [{
            payment_method: {
              type: "default"
            }
          }]
        }, function(err, order) {
          if(err){
            return done(err);
          }
          else{
            var pay = order.toObject();
            Payments.create({
              user: user.id,
              purchaseId: pay.id,
              status: constants.payment[pay.payment_status],
              itemType: values.itemType,
              reference: values.itemId
            })
            .then(function (purchase){
              if (err) { 
                  return done(err);
              }
              else{
                console.log(pay);
                return pay;
              }
            })
            .then(function (pay) {
              var response = {
                payment_status: pay.payment_status,
                amount: pay.amount,
                currency: pay.currency,
                customer_info: pay.customer_info,
                purchaseId: pay.id
              };
              console.log(response);
              if(response.payment_status == 'paid'){
               ItemsFinderService.update(values, function (err, updated) {
                if(err){
                  return done(err);
                }
                else{
                  return done(null, response);
                }
               }); 
              }
              else {
                return done(null, response);   
              }
            })
            .catch(function (err) {
              return done(err);
            });   
          }
        });
      }
    });
  },
  createCostumer: function (user, values,  done) {
    conekta.Customer.create({
      name: values.cardname,
      email: user.email,
      payment_sources: [{
      token_id: values.conektaTokenId,
      type: 'card'
    }]
    }, function(err, customer) {
      if(err){
        return done(err);
      }
      else{
        var custom = customer.toObject();
        User.update({id: user.id},{conekta: custom.id}).exec(function afterwards(err, updated){
          if (err) {
            return done(err);
          }
          else{
            return done(null, updated[0]);
          }
        });
      }
    });
  },
  createPaymentSource: function (user, values, done) {
    conekta.Customer.find(user.conekta, function(err, customer) {
      customer.createPaymentSource({
        type: "card",
        token_id: values.conektaTokenId
      }, function(err, res) {
        if(err){
          return done(err);
        }
        else{
          var resp = res.toObject();
          return done(resp); 
        }
      });
    });
  },
  deletePaymentSource: function (user, values, done) {
    conekta.Customer.find(user.conekta, function(err, customer) {
      customer.payment_sources.get(0).delete(function(err, resp) {
        console.log(resp.toObject());
      })
    });
  },
  createPlan: function (values, done) {
    cent = values.amount*100;
    conekta.Plan.create({
      //"id": values.planId,
      "name": values.name,
      "amount": cent,
      "currency": "MXN",
      "interval": "year",
      "frequency": 1
    }, function (err, res) {
      if(err){
        return done(err);
      }
      else{
        var plan = res.toObject();
        return done(null, plan);
      }
    });
  }
}