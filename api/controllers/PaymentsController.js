/**
 * PaymentsController
 *
 * @description :: Server-side logic for managing Payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var conekta = require('conekta');
 conekta.api_key = 'key_poWJzs7PVwgKD8eAFqdnYw';
 conekta.api_version = '2.0.0';
var paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox', //sandbox or live 
  'client_id': 'AWCKGzQv2c29C-zyzlEFpAz5GljvGPbXqSptzJw7V4BuEQFMle3j54kYPFQLM-z-ug-IycznJvdngzns',
  'client_secret': 'EKOvENrICZilSHCE44wTyVZZQbwDsBoY5Hzk_UTbAW4LG3WLOtC79zbMZz7UTCLzAPnL7lNDvUGhmMZH'
});
module.exports = {
    conekta: function(req, res) {
        conekta.Customer.create({
            name: req.body.cardname,
            email: 'usuario@example.com',
            phone: '+5215555555555',
            payment_sources: [{
              token_id: req.body.conektaTokenId,
              type: 'card'
            }]
        }, function(err, customer) {
            if(err){
                res.serverError(err);
            }
            else{ 
                conekta.Order.create({
                    line_items: [{
                        name: "Tattoo",
                        unit_price: 1000,
                        quantity: 1
                    }],
                    currency: "MXN",
                    customer_info: {
                     customer_id: customer.toObject().id
                    },
                    charges: [{
                        payment_method: {
                            type: "default"
                        }
                    }]
                }, function(err, order) {
                    if(err){
                      return res.serverError(err);
                    }
                    else{
                        pay = order.toObject();
                        var response = {
                            payment_status: pay.payment_status,
                            amount: pay.amount,
                            currency: pay.currency,
                            customer_info: pay.customer_info
                        };
                        res.send(response);   
                    }
                });
            }
        });
    },
    paypalIntent: function (req, res) {
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
                        name: req.body.item,
                        sku: "tatooflorshurado",
                        price: req.body.price,
                        currency: "MXN",
                        quantity: 1
                    }]
                },
                amount: {
                    currency: "MXN",
                    total: req.body.price
                },
                description: "This is the payment description."
            }]
        }
        paypal.payment.create(payment, function (error, payment) {
          if (error) {
            res.serverError(err);
          } else {
            if(payment.payer.payment_method === 'paypal') {
              req.session.paymentId = payment.id;
              var redirectUrl;
              for(var i=0; i < payment.links.length; i++) {
                var link = payment.links[i];
                if (link.method === 'REDIRECT') {
                  redirectUrl = link.href;
                }
              }
              res.redirect(redirectUrl);
            }
          }
        });

    },
    paypalExecute: function (req, res) {
        var paymentId = req.session.paymentId;
        var payerId = req.param('PayerID');

        var details = { "payer_id": payerId };
        paypal.payment.execute(paymentId, details, function (error, payment) {
            if (error) {
                console.log(error);
            } else {
                console.log("paid", payment);
                console.log(payment.transactions[0].amount);
                res.send({
                    message: "Paid",
                    amount: payment.transactions[0].amount,
                    items: payment.transactions[0].item_list.items
                });
            }
        });
    },
    paypalCancel: function (req, res) {
        res.send({message: "The payment got canceled"});
    }
};

