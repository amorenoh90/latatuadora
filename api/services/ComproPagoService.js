var request = require('request');
var comprapagotoken = 'sk_test_4327294905c54c2065';
//var comprapagotoken = 'sk_test_5c967347043342cef8';
var constants = require('../Constants');
var moment = require('moment');
module.exports = {
  order: function (values, auth, done) {
    var headers = {
      'Accept': 'application/compropago',
      'Content-type': 'application/json'
    };
    var dataString = {
      order_id: values.item.id,
      order_price: values.item.amount,
      order_name: values.item.name,
      customer_name: auth.name,
      customer_email: auth.email,
      payment_type: values.payment_type,
      currency: "MXN"
    };
    dataString = JSON.stringify(dataString);
    var options = {
      url: 'https://api.compropago.com/v1/charges',
      headers: headers,
      body: dataString,
      auth: {
        'user': comprapagotoken,
        'pass': ''
      }
    };

    function callback(err, response, body) {
      var resp = JSON.parse(body);
      if (err) {
        return done(err);
      }
      if (resp.type === 'error') {
        done(resp.message);
      }
      if (!err && response.statusCode == 200 && resp.type != 'error') {
        Payments.create({
          user: auth.id,
          purchaseId: resp.id,
          status: constants.payment.pending,
          itemType: values.itemType,
          reference: resp.order_info.order_id
        }).exec(function (err, payment) {
          if (err) {
            return done(err);
          } else {
            var responsetosend = {
              status: resp.status,
              instructions: resp.instructions,
              item: resp.order_info.order_name,
              id: resp.id
            };
            done(null, responsetosend);
          }
        });
      } else {
        done(response.body.message);
      }
    }

    try {
      request.post(options, callback);
    }
    catch (err) {
      done(err);
    }
  },
  pay: function (values, done) {
    var status;
    switch (values.type) {
      case 'charge.success':
        status = constants.payment.paid;
        break;
      case 'charge.pending':
        status = constants.payment.pending;
        break;
      case 'charge.expired':
        status = constants.payment.expired;
        break;
      default:
        status = constants.payment.undefined;
        break;
    }
    Payments.update({purchaseId: values.id}, {status: status})
      .exec(function afterwards(err, updated) {
        if (err) {
          done(err);
        } else {
          ComproPagoService.updateItem(updated[0], function (err, item) {
            if (err) {
              return done(err);
            } else {
              return done(null, item);
            }
          });
        }
      });
  },
  updateItem: function (values, done) {
    var exp = moment().add(1, 'y').format();
    var collection = constants.itemType[values.itemType];
    switch (collection) {
      case 'Flash':
        Flash.update({id: values.reference}, {sell: true}).exec(function afterwards(err, flash) {
          if (err) {
            return done(err);
          } else {
            done(null, flash);
          }
        });
        break;
      case 'StudioMembership':
        Studio.update({userId: values.user}, {
          status: constants.membershipStatus.active,
          membershipExp: exp
        }).exec(function afterwards(err, studio) {
          if (err) {
            return done(err);
          } else {
            return done(null, studio);
          }
        });
        break;
      case 'FreelanceMembership':
        Freelancer.update({user: values.user}, {
          status: constants.membershipStatus.active,
          membershipExp: exp
        }).exec(function afterwards(err, freelancer) {
          if (err) {
            return res.negotiate(err);
          } else {
            return done(null, freelancer);
          }
        });
        break;
      default:
        done('Unknow Item Type');
        break;
    }
  }
};
