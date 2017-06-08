/**
 * PaymentsController
 *
 * @description :: Server-side logic for managing Payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var conekta = require('conekta');
 conekta.api_key = 'key_poWJzs7PVwgKD8eAFqdnYw';
 conekta.api_version = '2.0.0';
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
    }
};

