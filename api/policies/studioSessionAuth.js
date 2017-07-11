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
          req.body.studio = user.id;
          return next();
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