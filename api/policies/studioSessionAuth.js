/**
* studioSessionAuth
*/
var constants = require('../Constants');
module.exports = function(req, res, next) {
  var forbiddenmessage = 'You are not permitted to perform this action.';
  var token = req.headers["x-authorization"];
  if (token) { 
  jwt.verifyToken(token, function (err, decoded) {
    if(err){
    return res.forbidden({message : err.message});
    }
    else{
    if(decoded.typ == constants.userType.studio){
      var user = {
      id: decoded.sub
      }
      req.headers.user = user;
      Studio.findOne({userId: user.id})
      .then(function (studio){
        if(!studio){
          res.notFound({message : 'Could not find Studio, sorry.'});
        }
        else{
          req.headers.studio = studio;
          if(req.body){
            req.body.studio = studio.id;
          }
          return next();
        }
      })
      .catch(function (err) {
        return res.serverError(err);
      });
    }
    else{
      return res.forbidden({message: 'This User Type not permitted to perform this action.'})
    }
  }
  });
  }
  else{
   return res.forbidden({message : forbiddenmessage}); 
  }
};