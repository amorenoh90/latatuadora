/**
 * UserController
 */
var constants = require('../Constants');
module.exports = {
  logup: function (req, res) {
    LogUpService.add(req.body, req.file, function (err, done) {
      if (err) {
        res.badRequest(err);
      } else {
        res.send({token: done});
      }
    })
  },
  login: function (req, res) {
    var loginuser = {
      email: req.body.email,
      password: req.body.password
    };
    if (loginuser.email && loginuser.password) {
      User.attemptLogin(loginuser, function (err, user) {
        if (!err) {
          if (!user) {
            res.badRequest("Invalid Email/Password combination");
          } else {
            res.send({token: JWT.createToken(user), usertype: user.userType});
          }
        } else {
          res.negotiate(err);
        }
      });
    } else {
      res.badRequest('Email and Password are required');
    }
  },
  favs: function (req, res) {
    var values = {};
    values.user = req.headers.user;
    FavTattooFlashService.find(values, function (err, favs) {
      if (err) {
        res.serverError(err);
      } else {
        res.send(favs);
      }
    });
  }
};
