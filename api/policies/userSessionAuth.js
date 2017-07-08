/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
 var constants = require('../Constants');
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  var forbiddenmessage = 'You are not permitted to perform this action.';
  var token = req.headers["x-authorization"];
  if (token) { 
    jwt.verifyToken(token, function (err, decoded) {
        if(err){
            return res.forbidden({message : err.message});
        }
        else{
            if(decoded.typ == constants.userType.user){
                var user = {
                    id: decoded.sub
                }
                req.headers.user = user;
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
