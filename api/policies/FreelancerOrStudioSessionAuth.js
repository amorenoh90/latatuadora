var constants = require('../Constants');
module.exports = function (req, res, next) {
  
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  var forbiddenmessage = 'You are not permitted to perform this action.';
  var token = req.headers["x-authorization"];
  if (token) {
    JWT.verifyToken(token, function (err, decoded) {
      if (err) {
        return res.forbidden({message: err.message});
      } else {
        if (decoded.typ == constants.userType.freelancer) {
          var user = {
            id: decoded.sub
          };
          req.headers.user = user;
          Freelancer.findOne({userId: user.id})
            .then(function (freelancer) {
              if (!freelancer) {
                return res.notFound({message: 'Could not find Freelancer, sorry.'});
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
          var user = {
            id: decoded.sub
          };
          req.headers.user = user;
          Studio.findOne({userId: user.id})
            .then(function (studio) {
              if (!studio) {
                return res.notFound({message: 'Could not find Studio, sorry.'});
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
          return res.forbidden({message: 'This User Type not permitted to perform this action.'})
        }
      }
    });
  } else {
    return res.forbidden({message: forbiddenmessage});
  }
};
