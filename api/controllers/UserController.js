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
    var user = {
      name: req.body.name,
      certCofepris: req.body.certCofepris
    };
    console.log('user', user)
    User.create(user).exec(function (err, records) {
      if(err) {
        res.send(500, 'Error');
      } else {
        console.log(records, 'enriquelc-----');
        res.send(200, 'nice');
      }
    });
  }
};

