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
      telephone: req.body.telephone,
      userType: constants.userType.quotient
    };
    User.findOrCreate({email: newuser.email},newuser).exec(function (err, user){
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
                else {
                  Style.findOne({id:quotation.styleId}).exec(function (err, style){
                    if (err) {
                      return res.serverError(err);
                    }
                    if (!style) {
                      return res.notFound('Could not find Style, sorry.');
                    }
                    else{
                      calculated.styleText = style.calculatorText;
                      res.send(200, calculated); 
                    }
                  });
                }
              });
            }
            else{
              res.ok({message: "Are you quoting with study"});
            }
          }
        });
      }
    });
  },
  findByStudio: function (req, res) {
    var studio = req.headers.user.id;
    Quotation.find({studioId: studio}).exec(function (err, quotations){
      if (err) {
        return res.serverError(err);
      }
      else{
        return res.send(quotations);
      }
    });
  },
  find:function (req, res) {
    Quotation.find({studio: null}).exec(function (err, quotations){
      if (err) {
        return res.serverError(err);
      }
      else{
        return res.send(quotations);
      }
    });
  }
};