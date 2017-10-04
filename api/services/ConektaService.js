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
  buyFlash: function (values, auth, done) {
    if (auth.conekta === null) {
      ConektaService.createCostumer(values, auth, function (err, customer) {
        if (err) {
          return done(err);
        } else {
          ConektaService.order(customer, values, function (err, order) {
            if (err) {
              return done(err);
            } else {
              return done(null, order);
            }
          });
        }
      });
    } else {
      ConektaService.order(values, auth, function (err, order) {
        if (err) {
          return done(err);
        } else {
          return done(null, order);
        }
      });
    }
  },
  buyMembership: function (values, auth, done) {
    if (auth.conekta === null) {
      ConektaService.createCostumer(values, auth, function (err, customer) {
        if (err) {
          return done(err);
        } else {
          ConektaService.subscribe(values, customer, function (err, subscription) {
            if (err) {
              return done(err);
            } else {
              return done(null, subscription);
            }
          });
        }
      });
    } else {
      ConektaService.subscribe(values, auth, function (err, subscription) {
        if (err) {
          return done(err);
        } else {
          return done(null, subscription);
        }
      });
    }
  },
  purchaseLeadCredits: function (values, auth, done) {
    if (auth.conekta === null) {
      ConektaService.createCostumer(values, auth, function (err, customer) {
        if (err) {
          return done(err);
        } else {
          ConektaService.orderLeads(customer, values, function (err, order) {
            if (err) {
              return done(err);
            } else {
              return done(null, order);
            }
          });
        }
      });
    } else {
      ConektaService.orderLeads(values, auth, function (err, order) {
        if (err) {
          return done(err);
        } else {
          return done(null, order);
        }
      });
    }
  },
  order: function (values, user, done) {
    Flash.findOne({id: values.itemId})
      .then(function (flash) {
        if (!flash) {
          return done('Could not find Flash, sorry.');
        } else {
          return flash;
        }
      })
      .then(function (flash) {
        flash.amount = flash.amount * 100;
        conekta.Order.create({
          currency: "MXN",
          customer_info: {
            customer_id: user.conekta
          },
          line_items: [{
            name: 'flash' + flash.id,
            unit_price: flash.amount,
            quantity: 1
          }],
          charges: [{
            payment_method: {
              type: "default"
            }
          }]
        }, function (err, order) {
          if (err) {
            return done(err);
          }
          var pay = order.toObject();
          Payments.create({
            user: user.id,
            purchaseId: pay.id,
            status: constants.payment[pay.payment_status],
            itemType: values.itemType,
            reference: values.itemId
          }).exec(function (err, payment) {
            if (err) {
              return done(err);
            } else {
              var response = {
                payment_status: pay.payment_status,
                amount: pay.amount / 100,
                currency: pay.currency,
                customer_info: pay.customer_info,
                purchaseId: pay.id
              };
              if (response.payment_status == 'paid') {
                Flash.update({id: flash.id}, {sell: true})
                  .exec(function afterwards(err, updated) {
                    if (err) {
                      return done(err);
                    } else {
                      return done(null, response);
                    }
                  });
              } else {
                return done(null, response);
              }
            }
          });
        })
      })
      .catch(function (err) {
        return done(err);
      });
  },
  orderLeads: function (values, user, done) {
    var leads = {};
    leads.amount = constants.lead_price[values.itemId];

    conekta.Order.create({
      currency: "MXN",
      customer_info: {
        customer_id: user.conekta
      },
      line_items: [{
        name: 'leads-' + values.lead_amount,
        unit_price: leads.amount * 100,
        quantity: 1
      }],
      charges: [{
        payment_method: {
          type: "default"
        }
      }]
    }, function (err, order) {
      if (err) {
        return done(err);
      }
      var pay = order.toObject();
      Payments.create({
        user: user.id,
        purchaseId: pay.id,
        status: constants.payment[pay.payment_status],
        itemType: values.itemType,
        reference: values.itemId
      }).exec(function (err, payment) {
        if (err) {
          return done(err);
        } else {
          var response = {
            payment_status: pay.payment_status,
            amount: pay.amount / 100,
            currency: pay.currency,
            customer_info: pay.customer_info,
            purchaseId: pay.id
          };
          if (response.payment_status == 'paid') {
            LeadService.purchaseCredits({
              input: {
                user: user.id,
                lead_amount: parseInt(values.itemId) - 1
              }
            }, function (err) {
              if (err) {
                return done(err);
              } else {
                return done(null, response);
              }
            });
          } else {
            return done(null, response);
          }
        }
      });
    });
  },
  createCostumer: function (values, user, done) {
    conekta.Customer.create({
      name: values.cardname,
      email: user.email,
      payment_sources: [{
        token_id: values.conektaTokenId,
        type: 'card'
      }]
    }, function (err, customer) {
      if (err) {
        return done(err);
      } else {
        var custom = customer.toObject();
        User.update({id: user.id}, {conekta: custom.id}).exec(function afterwards(err, updated) {
          if (err) {
            return done(err);
          } else {
            return done(null, updated[0]);
          }
        });
      }
    });
  },
  createPaymentSource: function (user, values, done) {
    conekta.Customer.find(user.conekta, function (err, customer) {
      customer.createPaymentSource({
        type: "card",
        token_id: values.conektaTokenId
      }, function (err, res) {
        if (err) {
          return done(err);
        } else {
          var resp = res.toObject();
          return done(resp);
        }
      });
    });
  },
  deletePaymentSource: function (user, values, done) {
    conekta.Customer.find(user.conekta, function (err, customer) {
      customer.payment_sources.get(0).delete(function (err, resp) {
      })
    });
  },
  createPlan: function (values, done) {
    cent = values.amount * 100;
    conekta.Plan.create({
      "id": values.planId,
      "name": values.name,
      "amount": cent,
      "currency": "MXN",
      "interval": "year",
      "frequency": 1
    }, function (err, res) {
      if (err) {
        return done(err);
      } else {
        var plan = res.toObject();
        return done(null, plan);
      }
    });
  },
  subscribe: function (values, auth, done) {
    Memberships.findOne({id: auth.member.membership})
      .then(function (membership) {
        if (!membership) {
          return done('Could not find Membership, sorry.');
        }
        return membership;
      })
      .then(function (membership) {
        customer = conekta.Customer.find(auth.conekta, function (err, customer) {
          customer.createSubscription({
            plan: membership.conekta
          }, function (err, res) {
            if (err) {
              return done(err);
            } else {
              subscription = res.toObject();
              var paymentstatus;
              if (membership.status == 'active') {
                paymentstatus = constants.payment.paid;
              } else {
                paymentstatus = constants.payment.pending;
              }
              Payments.create({
                user: auth.id,
                purchaseId: subscription.id,
                status: paymentstatus,
                itemType: values.itemType,
                reference: values.itemId
              }).exec(function (err, payment) {
                if (err) {
                  return done(err);
                } else {
                  var response = {
                    status: subscription.status,
                    purchaseId: subscription.id
                  };
                  return done(null, response);
                }
              });
            }
          });
        });
      })
      .catch(function (err) {
        return done(err);
      });
  }
};
