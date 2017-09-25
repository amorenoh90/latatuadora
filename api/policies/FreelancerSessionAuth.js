/**
 * freelancerSessionAuth
 */
var constants = require('../Constants');
module.exports = function (req, res, next) {
  var forbiddenmessage = 'You are not permitted to perform this action.';
  var token = req.headers["x-authorization"];
  if (token) {
    JWT.verifyToken(token, function (err, decoded) {
      if (err) {
        return res.forbidden({
          message: err.message
        });
      } else {
        if (decoded.typ == constants.userType.freelance) {
          var user = {
            id: decoded.sub
          };
          req.headers.user = user;
          Freelancer.findOne({
              user: user.id
            })
            .then(function (freelancer) {
              if (!freelancer) {
                return res.notFound({
                  message: constants.messages.NO_SUCH_USER
                });
              } else {
                req.headers.freelancer = freelancer;
                if (req.body) {
                  req.body.freelancer = freelancer.id;
                }
                return next();
              }
            })
            .catch(function (err) {
              return res.serverError(err);
            });
        } else {
          return res.forbidden({
            message: constants.messages.ACCESS_FORBIDDEN
          })
        }
      }
    });
  } else {
    return res.forbidden({
      message: constants.messages.ACCESS_FORBIDDEN
    });
  }
};
