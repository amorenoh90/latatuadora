var constants = require('../Constants');
module.exports = {
  add: function (values, image, done) {
    var token;
    if (values.form == 'user') {
      var newuser = {
        name: values.name,
        email: values.email,
        password: values.password,
        userType: constants.userType.user
      };
      User.signUp(newuser, function (err, user) {
        if (err) {
          return done(err);
        }
        else {
          if (!user) {
            return done(err);
          }
          else {
            return done(null, JWT.createToken(user));
          }
        }
      });
    }
    if (values.form == 'studio') {
      var newstudioUser = {
          name: values.name,
          email: values.email,
          password: values.password,
          userType: constants.userType.studio,
          telephone: values.telephone,
        },
        newstudio = {
          name: values.name,
          certCofepris: values.cofepris,
          about: values.about,
        },
        addressStudio = {
          street: values.street,
          numInt: values.numInt,
          numExt: values.numExt,
          lat: values.lat,
          long: values.long,
          zc: values.zc,
          state: values.state,
          town: values.town,
          suburb: values.suburb
        }, studioId;
      AddressService.add(addressStudio, function (err, newaddressId) {
        if (err) {
          return done(err);
        }
        else {
          User.signUp(newstudioUser, function (err, studioUser) {
            if (err) {
              return done(err);
            }
            else {
              if (!studioUser) {
                return done(err);
              }
              else {
                newstudio.userId = studioUser.id;
                newstudio.addressId = newaddressId;
                Studio.create(newstudio).exec(function (err, studio) {
                  if (err) {
                    return done(err);
                  }
                  else {
                    for (i in values.schedule) {
                      values.schedule[i].studioId = studio.id;
                      Schedule.create(values.schedule[i])
                        .exec(function (err, shedule) {
                          if (err) {
                            return done(err);
                          }
                        });
                      for (i in values.styles) {
                        values.styles[i].studioId = studio.id;
                        StudioStyle.create(values.styles[i])
                          .exec(function (err) {
                            if (err) {
                              return done(err);
                            }
                          });
                      }
                    }
                    Studio.addProfileImg(image, studio.id, function (cb) {
                      done(null, JWT.createToken(studioUser));
                    });
                  }
                });

              }
            }
          });
        }
      });
    }
    if (values.form == "freelancer") {
      var newfreelancerUser = {
          name: values.name,
          email: values.email,
          password: values.password,
          telephone: values.telephone,
          userType: constants.userType.freelance
        },
        newfreelancer = {
          name: values.name,
          about: values.about
        }
      User.create(newfreelancerUser).exec(function (err, freelanceruser) {
        if (err) {
          return done(err);
        }
        else {
          newfreelancer.user = freelanceruser.id;
          Freelancer.create(newfreelancer).exec(function (err, freelancer) {
            if (err) {
              return done(err);
            }
            else {
              Artist.create({freelancerId: freelancer.id})
                .exec(function (err, artist) {
                  if (err) {
                    return done(err);
                  }
                  else {
                    for (i in values.zones) {
                      values.zones[i].freelancerId = freelancer.id;
                      Zone.create(values.zones[i]).exec(function (err) {
                        if (err) {
                          return done(err);
                        }
                      });
                    }
                    Freelancer.addProfileImg(image, freelancer.id, function (cb) {
                      return done(null, JWT.createToken(freelanceruser));
                    })
                  }
                });
            }

          });
        }
      });

    }
  }
}
