var constants = require('../Constants');
module.exports = function (req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  var token = req.headers["x-authorization"];
  if (token) {
    JWT.verifyToken(token, function (err, decoded) {
      if (err) {
        return res.forbidden({
          message: err.message
        });
      } else {
        var user = {
          id: decoded.sub
        };
        if (decoded.typ == constants.userType.freelance) {
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
        }
        if (decoded.typ == constants.userType.studio) {
          req.headers.user = user;
          Studio.findOne({
              userId: user.id
            })
            .then(function (studio) {
              if (!studio) {
                return res.notFound({
                  message: constants.messages.NO_SUCH_USER
                });
              } else {
                req.headers.studio = studio;
                if (req.body) {
                  req.body.studio = studio.id;
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
