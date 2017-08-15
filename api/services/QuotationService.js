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
        Quotation.create(quotation).exec(function (err, quotation) {
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
                    quotation: quotation.id
                  }).exec(function (err, refrence) {
                    if (err) {
                      return done(err);
                    }
                  });
                }
              }
            });
            if (!quotation.studioId) {
              Quotient.calculate(quotation, function (err, calculated) {
                if (err) done(err); else {
                  Style.findOne({id: quotation.styleId}).exec(function (err, style) {
                    if (err) {
                      return done(err);
                    }
                    calculated.styleText = style.calculatorText;
                    return done(null, calculated);
                  });
                  // TODO send mail to admin@latatuadora.com
                  var emailContent = {
                    to: user.email,
                    subject: 'Example',
                    text: "HolaMundo desde cotizacion" // TODO Use the mail service instead
                  };
                  EmailService.send(emailContent, function(err, content) {});
                }
              });
            } else {
              return done(null, {message: "Are you quoting with study"});
            }
          }
        });
      }
    });
  }
};
