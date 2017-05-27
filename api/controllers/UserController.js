/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	logup: function(req, res) {
		var newuser={
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		}
		User.signUp(newuser, function (err, user) {
			if(err) res.negotiate(err);
			else{
				if(!user){
					res.notFound(err);
				}
				else{
					res.status(200).send({token: jwt.createToken(newuser)});
				}
			}
		})
	},
	login: function(req, res) {
		var user ={
			email: req.body.email,
			password: req.body.password
		}

		if(user.email && user.password){
			User.attemptLogin({ email: req.body.email, password: req.body.password}, function (err, user) {
				if(!err){
					if(!user) {
						res.badRequest("Invalid Email/Password combination");
					}
					else{
						res.status(200).send({token: jwt.createToken(user)});	
					}
				}
				else{
					res.negotiate(err);
				}
			})
		}
		else{
			res.badRequest('Email and Password are required');
		}
	}
};

