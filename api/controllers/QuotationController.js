/**
 * QuotationController
 */
var constants = require('../Constants');

module.exports = {
  
/**
 * (POST /quotation)
 */
  createquotation: function  (req, res) {

    var newuser = {
      name: req.body.name,
      email: req.body.email,
      city: req.body.city,
      telephone: req.body.telephone,
      userType: constants.userType.quotient
    }

    User.findOrCreate(newuser).exec(function (err, user){
      if (err){
        res.serverError(err);
      }
        else{
        var  quotation = {
          dimensionsY : req.body.dimensionsY,
          dimensionsX : req.body.dimensionsX,
          comments: req.body.comments,
          styleId: req.body.style,
          bodypartId: req.body.bodypart,
          studioId: req.body.studio,
          userId: user.id
        }

        Quotation.create(quotation).exec(function (err, quotation){
          if (err){
            res.serverError(err);
          }  
          else{ 
            req.file('reference').upload({
              maxBytes: 10000000,
              dirname: require('path').resolve(sails.config.appPath, 'assets/references/images')
            },function (err, uploadedFiles) {
              if (err) {
                sails.log.error(err);
              }
              else{
                for(i in uploadedFiles){
                  QuotationReferences.create({imgUrl: uploadedFiles[i].fd, quotation: quotation.id}).exec(function (err, refrence){
                    if (err) { return res.serverError(err); }
                  });
                }
              }
            });

            if(!quotation.studioId){
              Quotient.calculate(quotation, function (err, calculated) {
                if(err) res.negotiate(err);
                else res.send(200, calculated);
              });
            }
            else{
              res.ok("Are you quoting with study");
            }
          }
        });
      }
    });
  }
};