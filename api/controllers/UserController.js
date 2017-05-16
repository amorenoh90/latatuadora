/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  hi: function (req, res) {
    return res.send('Hi there!');
  },
  bye: function (req, res) {
    return res.redirect(200, '/');
  },

  add: function (req, res) {
    var newuser = {
      name: req.body.name,
      certCofepris: req.body.certCofepris,
    };
    User.create(newuser).exec(function (err, user){
      if (err) {
        res.send(500, 'Error');
      } else { // For check new User in DB
        User.findOne(newuser).exec(function (err, record) {
          if(err) res.send(500, 'Error');
          if(!record) res.send(404, "Could not find User")
          else res.send(200, 'nice');
        })
      }
    });
  }
};

