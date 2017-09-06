module.exports = {
  createQuotation: function (values, done) {
    User.findOrCreate({email: values.newUser.email}, values.newUser).exec(function (err, user) {
      if (err) {
        done(err);
      } else {
        var quotation = {
          dimensionsY: values.dimensionsY,
          dimensionsX: values.dimensionsX,
          comments: values.comments,
          styleId: values.style,
          bodypartId: values.bodypart,
          studioId: values.studio,
          userId: user.id
        };
        Quotation.create(quotation).exec(function (err, createdQuotation) {
          if (err) {
            return done(err);
          } else {
            values.file('reference').upload({
              maxBytes: 10000000,
              dirname: require('path').resolve(sails.config.appPath, 'assets/references/images')
            }, function (err, uploadedFiles) {
              if (err) {
                sails.log.error(err);
              } else {
                for (i in uploadedFiles) {
                  QuotationReferences.create({
                    imgUrl: uploadedFiles[i].fd,
                    quotation: createdQuotation.id
                  }).exec(function (err, refrence) {
                    if (err) {
                      return done(err);
                    }
                  });
                }
              }
            });
            createdQuotation.user = user;
            var emailContent = {
              model: {
                quotation: (createdQuotation || {})
              }
            };
            // Quoting with LaTatuadora
            if (!createdQuotation.studioId) {
              Quotient.calculate(createdQuotation, function (err, calculated) {
                if (err) done(err); else {
                  Style.findOne({id: createdQuotation.styleId}).exec(function (err, style) {
                    if (err) {
                      return done(err);
                    }
                    
                    calculated.styleText = style.calculatorText;
                    emailContent.model.quotation.maxAmount = calculated.maxAmount;
                    emailContent.model.quotation.minAmount = calculated.minAmount;
                    emailContent.model.quotation.style = style.name;
                    
                    EmailService.sendUserQuotation(emailContent, function (err, content) {});
                    EmailService.sendAdminQuotation(emailContent, function (err, content) {});
                    
                    return done(null, calculated);
                  });
                }
              });
            } else {
              Studio.findOne({id: createdQuotation.studioId}).populate("userId")
                .then(function (studio) {
                  if(studio.userId.email) {
                    emailContent.to = studio.userId.email;
                    emailContent.model.quotation.studio = studio;
                  }
                  
                  EmailService.sendUserQuotation(emailContent, function (err, content) {});
                  EmailService.sendAdminQuotation(emailContent, function (err, content) {});
                  EmailService.sendStudioQuotation(emailContent, function (err, content) {});
                });
              return done(null, {message: "Are you quoting with study"});
            }
          }
        });
      }
    });
  }
};
