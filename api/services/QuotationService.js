var quoteWithStudio = function (retrievedQuotation, done) {
  var emailContent = {
    model: {
      quotation: (retrievedQuotation || {})
    }
  };
  Studio.findOne({id: retrievedQuotation.studioId}).populate("userId")
    .then(function (studio) {
      if (studio.userId) {
        emailContent.to = studio.userId.email;
      }
      emailContent.model.quotation.studio = studio;
      
      EmailService.sendUserQuotation(emailContent);
      EmailService.sendAdminQuotation(emailContent);
      EmailService.sendStudioQuotation(emailContent);
    });
  return done(null, {message: "Are you quoting with study"});
};
var quoteWithFreelance = function (retrievedQuotation, done) {
  var emailContent = {
    model: {
      quotation: (retrievedQuotation || {})
    }
  };
  Freelancer.findOne({id: retrievedQuotation.freelancerId}).populate("user")
    .then(function (freelancer) {
      if (freelancer.user) {
        emailContent.to = freelancer.user.email;
        emailContent.model.quotation.freelancer = freelancer;
      }
      
      EmailService.sendUserQuotation(emailContent);
      EmailService.sendAdminQuotation(emailContent);
      EmailService.sendStudioQuotation(emailContent);
    });
  return done(null, {message: "Are you quoting with freelancer"});
};
var quoteWithLaTatuadora = function (retrievedQuotation, done) {
  Quotient.calculate(retrievedQuotation, function (err, calculated) {
    if (err) return done(err);
    var emailContent = {
      model: {
        quotation: (retrievedQuotation || {})
      }
    };
    
    emailContent.model.quotation.maxAmount = calculated.maxAmount;
    emailContent.model.quotation.minAmount = calculated.minAmount;
    
    EmailService.sendUserQuotation(emailContent);
    EmailService.sendAdminQuotation(emailContent);
    return done(null, calculated);
  });
};

module.exports = {
  createQuotation: function (values, done) {
    User.findOrCreate({email: values.newUser.email}, values.newUser).exec(function (err, user) {
      if (err) return done(err);
      var quotation = {
        dimensionsY: values.dimensionsY,
        dimensionsX: values.dimensionsX,
        comments: values.comments,
        styleId: values.style,
        bodypartId: values.bodypart,
        studioId: values.studio,
        freelancerId: values.freelance,
        userId: user.id
      };
      Quotation.create(quotation).then(function (createdQuotation) {
        Quotation.findOne({id: createdQuotation.id}).populate(["styleId", "bodypartId"]).then(function (retrievedQuotation) {
          values.file('reference').upload({
            maxBytes: 10000000,
            dirname: require('path').resolve(sails.config.appPath, 'assets/references/images')
          }, function (err, uploadedFiles) {
            if (err)  return done(err);
            var uploadedReferences = [];
            for (i in uploadedFiles) {
              uploadedReferences.push({
                imgUrl: uploadedFiles[i].fd,
                quotation: retrievedQuotation.id
              });
            }
            QuotationReferences.create(uploadedReferences).exec(function (err, referenceList) {
              if (err) return done(err);
              retrievedQuotation.user = user;
              retrievedQuotation.referenceList = referenceList;
            });
          });
          if (retrievedQuotation.studioId) {
            quoteWithStudio(retrievedQuotation, done);
          } else if (retrievedQuotation.freelancerId) {
            quoteWithFreelance(retrievedQuotation, done);
          } else {
            quoteWithLaTatuadora(retrievedQuotation, done);
          }
        });
      }).catch(function (retrievedError) {
        return done(retrievedError);
      });
    });
  }
};
