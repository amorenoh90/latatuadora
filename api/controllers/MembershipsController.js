/**
 * MembershipsController
 *
 * @description :: Server-side logic for managing Memberships
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var constants = require('../Constants.js');
var paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox', //sandbox or live 
  'client_id': 'AWCKGzQv2c29C-zyzlEFpAz5GljvGPbXqSptzJw7V4BuEQFMle3j54kYPFQLM-z-ug-IycznJvdngzns',
  'client_secret': 'EKOvENrICZilSHCE44wTyVZZQbwDsBoY5Hzk_UTbAW4LG3WLOtC79zbMZz7UTCLzAPnL7lNDvUGhmMZH'
});
module.exports = {
	add: function (req, res) {
		
	}
};

