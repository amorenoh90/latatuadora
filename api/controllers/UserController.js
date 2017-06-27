/**
 * UserController
 */
var constants = require('../Constants');
module.exports = {
    logup: function (req, res) {
      logupService.add(req.body, req.file, function (err, done) {
        if(err){
            res.badRequest(err);
        }
        res.send({token: done});
      })
    },
    login: function(req, res) {
        var loginuser = {
            email: req.body.email,
            password: req.body.password
        }

        if(loginuser.email && loginuser.password){
            User.attemptLogin(loginuser, function (err, user) {
                if(!err){
                    if(!user) {
                        res.badRequest("Invalid Email/Password combination");
                    }
                    else{
                        res.status(200).send({token: jwt.createToken(user), usertype: user.userType}); 
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