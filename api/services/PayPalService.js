var constants = require('../Constants');
var paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AWCKGzQv2c29C-zyzlEFpAz5GljvGPbXqSptzJw7V4BuEQFMle3j54kYPFQLM-z-ug-IycznJvdngzns',
  'client_secret': 'EKOvENrICZilSHCE44wTyVZZQbwDsBoY5Hzk_UTbAW4LG3WLOtC79zbMZz7UTCLzAPnL7lNDvUGhmMZH'
});
var moment = require('moment');
var url = require('url');
module.exports = {
  buyFlash: function (values, auth, done) {
    Flash.findOne({id: values.itemId})
      .exec(function (err, flash) {
        if (err) {
          return done(err);
        }
        if (!flash) {
          return done('Could not find Flash, sorry.');
        }
        else {
          var payment = {
            intent: "sale",
            payer: {
              payment_method: "paypal"
            },
            redirect_urls: {
              return_url: "http://localhost:1337/paypalexecute",
              cancel_url: "http://localhost:1337/paypalcancel"
            },
            transactions: [{
              item_list: {
                items: [{
                  name: "flash-" + flash.id,
                  sku: flash.id,
                  price: flash.amount,
                  currency: "MXN",
                  quantity: 1,
                  description: flash.significant
                }]
              },
              amount: {
                currency: "MXN",
                total: flash.amount
              }
            }]
          };
          paypal.payment.create(payment, function (err, payment) {
            if (err) {
              done(err);
            }
            else {
              var res = {};
              if (payment.payer.payment_method === 'paypal') {
                res.payment = payment;
                var redirectUrl;
                Payments.create({
                  user: auth.id,
                  purchaseId: payment.id,
                  status: constants.payment.pending,
                  itemType: values.itemType,
                  reference: values.itemId
                }).exec(function (err, payment) {
                  if (err) {
                    return done(err);
                  }
                });
                ;
                for (var i = 0; i < payment.links.length; i++) {
                  var link = payment.links[i];
                  if (link.method === 'REDIRECT') {
                    res.redirectUrl = link.href;
                  }
                }
                done(null, res);
              }
            }
          });
        }
      });
  },
  buyMembership: function (values, auth, done) {
    Memberships.findOne({id: auth.member.membership})
      .then(function (membsership) {
        if (!membsership) {
          return done('Could not find Membership, sorry.');
        }
        else {
          return membsership;
        }
      })
      .then(function (membership) {
        var isoDate = new Date();
        isoDate.setSeconds(isoDate.getSeconds() + 4);
        isoDate.toISOString().slice(0, 19) + 'Z';
        var billingAgreementAttributes = {
          name: membership.name,
          description: membership.description,
          start_date: isoDate,
          plan: {
            id: membership.paypal
          },
          payer: {
            payment_method: "paypal"
          }
        };
        paypal.billingAgreement.create(billingAgreementAttributes, function (error, billingAgreement) {
          if (error) {
            return done(error);
          }
          else {
            var links = {};
            billingAgreement.links.forEach(function (linkObj) {
              links[linkObj.rel] = {
                'href': linkObj.href,
                'method': linkObj.method
              };
            });
            if (links.hasOwnProperty('approval_url')) {
              var approval_url = links['approval_url'].href;
              var purchase = url.parse(approval_url, true).query.token;
              Payments.create({
                user: auth.id,
                purchaseId: purchase,
                status: constants.payment.pending,
                itemType: values.itemType,
                reference: membership.id
              }).then(function (payment) {
                return payment;
              })
                .then(function (argument) {
                  return done(null, approval_url);
                })
                .catch(function (err) {
                  done(err);
                });
            }
            else {
              return done('no redirect URI present');
            }
          }
        });
      })
      .catch(function (err) {
        return done(err);
      });
  },
  execute: function (values, done) {
    paypal.payment.execute(values.paymentId, values.details, function (error, payment) {
      if (error) {
        return done(error);
      }
      else {
        Payments.update({purchaseId: values.paymentId}, {status: constants.payment.paid})
          .then(function afterwards(localpayment) {
            return localpayment[0];
          })
          .then(function (localpayment) {
            Flash.update({id: localpayment.reference}, {sell: true})
              .exec(function afterwards(err, updated) {
                if (err) {
                  return done(err);
                }
                return updated;
              });
          })
          .then(function (updated) {
            var response = ({
              message: "Paid",
              amount: payment.transactions[0].amount,
              items: payment.transactions[0].item_list.items
            });
            return done(null, response);
          })
          .catch(function (err) {
            return done(err);
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
        }
        else {
          var resp = res.toObject();
          return done(resp);
        }
      });
    });
  },
  subscribe: function (token, done) {
    paypal.billingAgreement.execute(token, {}, function (err, billingAgreement) {
      if (err) {
        return done(err);
      }
      else {
        Payments.update({purchaseId: token}, {status: constants.payment.paid})
          .then(function afterwards(updated) {
            return updated[0];
          })
          .then(function (updated) {
            var exp = moment().add(1, 'y').format();
            if (updated.reference == constants.memberships.studio) {
              Studio.update({userId: updated.user}, {
                status: constants.membershipStatus.active,
                membershipExp: exp
              }).exec(function afterwards(err, studio) {
                if (err) {
                  return done(err);
                }
                else {
                  return done(null, updated);
                }
              });
            }
            if (updated.reference == constants.memberships.freelancer) {
              Freelancer.update({userId: updated.user}, {
                status: constants.membershipStatus.active,
                membershipExp: exp
              }).exec(function afterwards(err, flash) {
                if (err) {
                  return done(err);
                }
                else {
                  return done(null, updated);
                }
              });
            }
          })
          .catch(function (err) {
            return done(err);
          });
      }
    });
  }
}
