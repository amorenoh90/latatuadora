/**
 * QuotationController
 */
var constants = require('../Constants');

module.exports = {
  
/**
 * (POST /quotation)
 */
  quotation: function (req, res) {
    if(req.headers['x-authorization']){
      var token = req.headers['x-authorization'];
      jwt.verifyToken(token, function (err, decoded) {
        if(err){
          return res.forbidden({message : err.message});
        }
        if(decoded.typ != constants.userType.user){
          return res.forbidden({message: 'This User Type not permitted to perform this action.'});
        }
        else{
          User.findOne({id: decoded.sub}).exec(function (err, user){
            if (err) {
              return res.serverError(err);
            }
            if (!user) {
              return res.notFound('Could not find User, sorry.');
            }
            else{
              req.body.newUser = user;
              req.body.file = req.file;
              QuotationService.createquotation(req.body, function (err, quotation) {
                if(err){
                  return res.serverError(err);
                }
                else{
                  return res.send(quotation);
                }
              });
            }
          });
        }
      });
    }
    else{
      var newuser = {
        name: req.body.name,
        email: req.body.email,
        telephone: req.body.telephone,
        userType: constants.userType.quotient
      };
      req.body.newUser = newuser;
      req.body.file = req.file;
      QuotationService.createquotation(req.body, function (err, quotation) {
        if(err){
          return res.serverError(err);
        }
        else{
          return res.send(quotation);
        }
      });
    }
  },
  findByStudio: function (req, res) {
    var studio = req.headers.studio.id;
    Quotation.find({studioId: studio}).populate('styleId').populate('bodypartId').populate('userId').exec(function (err, quotations){
      if (err) {
        return res.serverError(err);
      }
      else{
        return res.send(quotations);
      }
    });
  },
  find:function (req, res) {
    Quotation.find({studioId: null}).exec(function (err, quotations){
      if (err) {
        return res.serverError(err);
      }
      else{
        return res.send(quotations);
      }
    });
  }
};