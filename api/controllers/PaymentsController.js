/**
 * PaymentsController
 *
 * @description :: Server-side logic for managing Payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
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
  conekta: function (req, res) {
    var auth = req.headers.user;
    var values = req.body;
    var collection = constants.itemType[values.itemType];
    User.findOne({id: auth.id})
      .then(function (user) {
        if (!user) {
          return res.notFound('Could not find User, sorry.');
        }
        return user;
      })
      .then(function (user) {
        switch (collection) {
          case 'Flash':
            ConektaService.buyFlash(values, user, function (err, flashbuyed) {
              if (err) {
                return res.serverError(err);
              } else {
                return res.send(flashbuyed);
              }
            });
            break;
          case 'StudioMembership':
            Studio.findOne({userId: auth.id})
              .then(function (studio) {
                if (!studio) {
                  return res.notFound('Could not find Studio, sorry.');
                } else {
                  user.member = studio;
                  return user;
                }
              })
              .then(function (user) {
                ConektaService.buyMembership(values, user, function (err, membership) {
                  if (err) {
                    return res.serverError(err);
                  } else {
                    if (membership.status == 'active') {
                      var exp = moment().add(1, 'y').format();
                      Studio.update({userId: auth.id}, {
                        status: constants.membershipStatus.active,
                        membershipExp: exp
                      }).exec(function afterwards(err, updated) {
                        if (err) {
                          return res.negotiate(err);
                        }
                      });
                    }
                    return res.send(membership);
                  }
                });
              })
              .catch(function (err) {
                return res.serverError(err);
              });
            break;
          case 'FreelanceMembership':
            Freelancer.findOne({user: auth.id})
              .then(function (freelancer) {
                if (!freelancer) {
                  return res.notFound('Could not find Freelancer, sorry.');
                } else {
                  user.member = freelancer;
                  return user;
                }
              })
              .then(function (user) {
                ConektaService.buyMembership(values, user, function (err, membership) {
                  if (err) {
                    return res.serverError(err);
                  } else {
                    if (membership.status == 'active') {
                      var exp = moment().add(1, 'y').format();
                      Freelancer.update({user: auth.id}, {
                        status: constants.membershipStatus.active,
                        membershipExp: exp
                      }).exec(function afterwards(err, updated) {
                        if (err) {
                          return res.negotiate(err);
                        }
                      });
                    }
                    return res.send(membership);
                  }
                });
              })
              .catch(function (err) {
                return res.serverError(err);
              });
            break;
          default:
            return res.badRequest({message: 'Unknown function'});
        }
      })
      .catch(function (err) {
        return res.serverError(err);
      });
  },
  paypal: function (req, res) {
    var auth = req.headers.user;
    var values = req.body;
    var collection = constants.itemType[values.itemType];
    User.findOne({id: auth.id})
      .then(function (user) {
        if (!user) {
          return res.notFound('Could not find User, sorry.');
        }
        return user;
      })
      .then(function (user) {
        switch (collection) {
          case 'Flash':
            PayPalService.buyFlash(values, user, function (err, response) {
              req.session.paymentId = response.payment.id;
              res.redirect(response.redirectUrl);
            });
            break;
          case 'StudioMembership':
            Studio.findOne({userId: auth.id})
              .then(function (studio) {
                if (!studio) {
                  return res.notFound('Could not find Studio, sorry.');
                } else {
                  user.member = studio;
                  return user;
                }
              })
              .then(function (user) {
                PayPalService.buyMembership(values, user, function (err, redirectUrl) {
                  if (err) {
                    return res.serverError(err);
                  } else {
                    res.redirect(redirectUrl);
                  }
                });
              })
              .catch(function (err) {
                return res.serverError(err);
              });
            break;
          case 'FreelanceMembership':
            Freelancer.findOne({userId: auth.id})
              .then(function (freelance) {
                if (!freelance) {
                  return res.notFound('Could not find Freelance, sorry.');
                } else {
                  user.member = freelance;
                  return user;
                }
              })
              .then(function (user) {
                PayPalService.buyMembership(values, user, function (err, redirectUrl) {
                  if (err) {
                    return res.serverError(err);
                  } else {
                    res.redirect(redirectUrl);
                  }
                });
              })
              .catch(function (err) {
                return res.serverError(err);
              });
            break;
          default:
            return res.badRequest({message: 'Unknown function'});
        }
      })
      .catch(function (err) {
        return res.serverError(err);
      });
  },
  paypalExecute: function (req, res) {
    var paypal = {};
    paypal.paymentId = req.session.paymentId;
    var payerId = req.param('PayerID');
    paypal.details = {"payer_id": payerId};
    PayPalService.execute(paypal, function (err, payment) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send(payment);
      }
    });
  },
  paypalCancel: function (req, res) {
    res.send({message: "The payment got canceled"});
  },
  paypalAceptPlan: function (req, res) {
    var token = req.query.token;
    PayPalService.subscribe(token, function (err, plan) {
      if (err) {
        return res.serverError(err);
      }
      return res.send(plan);
    });
  },
  paypalCancelPlan: function (req, res) {
    var token = req.query.token;
    Payments.update({purchaseId: token}, {status: constants.payment.canceled}).exec(function afterwards(err, updated) {
      if (err) {
        return res.negotiate(err);
      }
    });
    res.send('Plan Canceled');
  },
  compropagoOptions: function (req, res) {
    var headers = {
      'Accept': 'application/compropago',
      'Content-type': 'application/json'
    };
    var dataString = '{"order_total": ' + req.param('price') + '}';
    var options = {
      url: 'https://api.compropago.com/v1/providers',
      headers: headers,
      body: dataString,
      auth: {
        'user': comprapagotoken,
        'pass': ''
      }
    };
    
    function callback(err, response, body) {
      if (err) {
        res.serverError(err);
      }
      if (!err && response.statusCode == 200) {
        res.send({points: body});
      } else {
        res.send({message: body});
      }
    }
    
    request.get(options, callback);
  },
  compropagoCharge: function (req, res) {
    var values = req.body;
    var auth = req.headers.user;
    var collection = constants.itemType[values.itemType];
    User.findOne({id: auth.id}).exec(function (err, user) {
      if (err) {
        return res.serverError(err);
      }
      if (!user) {
        return res.notFound('Could not find User, sorry.');
      }
      return auth = user;
    });
    switch (collection) {
      case 'Flash':
        Flash.findOne({id: values.itemId}).exec(function (err, flash) {
          if (err) {
            return res.serverError(err);
          }
          if (!flash) {
            return res.notFound('Could not find Flash, sorry.');
          } else {
            flash.name = 'flash-' + flash.id;
            values.item = flash;
            ComproPagoService.order(values, auth, function (err, order) {
              if (err) {
                return res.serverError(err);
              } else {
                return res.send(order);
              }
            });
          }
        });
        break;
      case 'StudioMembership':
        Studio.findOne({userId: auth.id})
          .then(function (studio) {
            if (!studio) {
              return res.notFound('Could not find Studio, sorry.');
            }
            return studio.membership;
          })
          .then(function (StudioMembership) {
            Memberships.findOne({id: StudioMembership}).exec(function (err, membership) {
              if (err) {
                return res.serverError(err);
              }
              if (!membership) {
                return res.notFound('Could not find Membership, sorry.');
              } else {
                values.item = membership;
                ComproPagoService.order(values, auth, function (err, order) {
                  if (err) {
                    return res.serverError(err);
                  } else {
                    return res.send(order);
                  }
                });
              }
            });
          })
          .catch(function (err) {
            return res.serverError(err);
          });
        break;
      case 'FreelanceMembership':
        Freelancer.findOne({userId: auth.id})
          .then(function (freelance) {
            if (!freelance) {
              return res.notFound('Could not find Freelancer, sorry.');
            }
            return freelance.membership;
          })
          .then(function (FreelancerMembership) {
            Memberships.findOne({id: FreelancerMembership}).exec(function (err, membership) {
              if (err) {
                return res.serverError(err);
              }
              if (!membership) {
                return res.notFound('Could not find Membership, sorry.');
              } else {
                values.item = membership;
                ComproPagoService.order(values, auth, function (err, order) {
                  if (err) {
                    return res.serverError(err);
                  } else {
                    return res.send(order);
                  }
                });
              }
            });
          })
          .catch(function (err) {
            return res.serverError(err);
          });
        break;
      default:
        res.send('Unknown function');
        break;
    }
  },
  compropagopay: function (req, res) {
    var values = req.body;
    ComproPagoService.pay(values, function (err, pay) {
      if (err) {
        res.serverError(err);
      } else {
        res.send(pay);
      }
    })
  }
};
