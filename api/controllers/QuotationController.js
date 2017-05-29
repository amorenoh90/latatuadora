/**
 * QuotationController
 */

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
      userType: 5
    }

    User.create(newuser).exec(function (err, user){
      if (err) res.serverError(err)
        else{
        var  quotation = {
          dimensionsY : req.body.dimensionsY,
          dimensionsX : req.body.dimensionsX,
          comments: req.body.comments,
          style: req.body.style,
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

            Quotation.findOne({id: quotation.id}).populate('userId').populate('style').populate('references').exec(function (err, quotation){
              if (err) {
                return res.serverError(err);
              }
              else{
                res.send(200, quotation);
              }
            });
          }
        });
      }
    });
  }
};