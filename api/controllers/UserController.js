var response;

function fillJSON(values, properties) {
  var json = {};

  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];

    if (values[property]) {
      json[property] = values[property];
    }
  }

  return json;
}

function done(err, result) {
  if (err) {
    response.badRequest(err);
  } else {
    response.send({
      token: result
    });
  }
}

function editUser(values, token) {
  var userEditionProps = [
    "name",
    "email",
    "password",
    "telephone",
    "userType"
  ];
  var userEdition = fillJSON(values, userEditionProps);
  User.update({
    id: values.id
  }, userEdition, function (err, user) {
    if (err) {
      return done(err);
    } else {
      if (!user) {
        return done(err);
      } else {
        return done(null, JWT.createToken(user));
      }
    }
  });
}

function editStudio(values, image, token) {

  var studioUserEditionProps = [
      "name",
      "email",
      "password",
      "telephone",
    ],
    studioEditionProps = [
      "name",
      "certCofepris",
      "about",
    ],
    addressStudioProps = [
      "street",
      "numInt",
      "numExt",
      "lat",
      "long",
      "zc",
      "state",
      "town",
      "suburb"
    ],
    studioId,
    studioUserEdition = fillJSON(values, studioUserEditionProps),
    studioEdition = fillJSON(values, studioEditionProps),
    addressStudio = fillJSON(values, addressStudioProps);
  studioUserEdition.userType = constants.userType.studio;
  AddressService.add(addressStudio, function (err, newaddressId) {
    if (err) {
      return done(err);
    } else {
      User.update({
        id: values.user
      }, studioUserEdition, function (err, studioUser) {
        if (err) {
          return done(err);
        } else {
          if (!studioUser) {
            return done(err);
          } else {
            studioEdition.userId = studioUser.id;
            studioEdition.addressId = newaddressId;
            Studio.update({
              id: values.studio
            }, studioEdition).exec(function (err, studio) {
              if (err) {
                return done(err);
              } else {
                for (i in values.schedule) {
                  values.schedule[i].studioId = studio.id;
                  Schedule.update({
                      id: studioUser.schedule
                    }, values.schedule[i])
                    .exec(function (err, shedule) {
                      if (err) {
                        return done(err);
                      }
                    });
                  for (i in values.styles) {
                    values.styles[i].studioId = studio.id;
                    StudioStyle.update({
                        id: studioUser.stu
                      }, values.styles[i])
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

function editFreelancer(values, image, token) {
  values.userType = constants.userType.freelance;
  var newfreelancerUserProps = [
      "name",
      "email",
      "password",
      "telephone",
      "userType"
    ],
    newfreelancerProps = [
      "name",
      "about",
      "fbUrl",
      "twUrl",
      "insUrl"
    ];

  var newfreelancerUser = fillJSON(values, newfreelancerUserProps),
    newfreelancer = fillJSON(values, newfreelancerProps);
  User.update({
    id: values.id
  }, newfreelancerUser).exec(function (err, freelanceruser) {
    if (err) {
      return done(err);
    } else {
      freelanceruser = freelanceruser[0];
      newfreelancer.user = freelanceruser.id;
      Freelancer.update({
        user: newfreelancer.user
      }, newfreelancer).exec(function (err, freelancer) {
        if (err) {
          return done(err);
        } else {
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
          });
        }
      });
    }
  });
}

function editArtist(values, image, token) {
  var artistEditionProps = [
    "name",
    "avatarUrl",
    "bio"
  ];
  var artistEdition = fillJSON(values, artistEditionProps);

  Artist.update({
    id: values.id
  }, artistEdition, function (err, artist) {
    if (err) {
      return done(err);
    } else {
      if (!artist) {
        return done(err);
      } else {
        artist = artist.pop();
        if (values.awards) {
          if (values.awards.length > 0) {
            var destroyAwards = async() => {
              await Awards.destroy({
                artist: artist.id
              });
              return "done";
            }

            destroyAwards();

            var awards = [];

            for (var i = 0; i < values.awards.length; i++) {
              var award = {};

              award.artist = artist.id;
              award.award = values.awards[i];
              awards.push(award);
            }

            var addAwards = async() => {
              await Awards.createEach(awards);
              return "done";
            }

            addAwards();
          }
        }

        return done(null, JWT.createToken(artist));
      }
    }
  });
}

var constants = require('../Constants');
var baseQuery = "select " +
  "User.name," +
  "User.lastname," +
  "User.email," +
  "User.password," +
  "User.id," +
  "User.telephone," +
  "User.userType," +
  "User.addressId," +
  "User.conekta," +
  "User.createdAt," +
  "User.updatedAt" +
  " from User where User.userType in (" + constants.userType.studio + ", " + constants.userType.freelance + ") ";


module.exports = {
  edit: function (req, res) {
    var values = req.allParams(),
      image = req.file,
      token;
    response = res;
    if (values.form == 'user') {
      editUser(values, token);
    }
    if (values.form == 'studio') {
      editStudio(values, image, token);
    }
    if (values.form == "freelancer") {
      editFreelancer(values, image, token);
    }
    if (values.form == "artist") {
      editArtist(values, image, token);
    }
    if (!values.form) {
      done(null, "No form specified");
    }
  },
  get: function (req, res) {
    var args = {
        req: req,
        input: req.allParams()
      },
      result = {};

    UserService
      .get(args, function (err, result) {
        if (err) {
          res.serverError({
            err: err,
            result: result
          });
        } else {
          res.send({
            result: result
          });
        }
      });
  },
  logup: function (req, res) {
    LogUpService.add(req.body, req.file, function (err, done) {
      if (err) {
        res.badRequest(err);
      } else {
        res.send({
          token: done
        });
      }
    })
  },
  login: function (req, res) {
    var loginuser = {
      email: req.body.email,
      password: req.body.password
    };
    if (loginuser.email && loginuser.password) {
      User.attemptLogin(loginuser, function (err, user) {
        if (!err) {
          if (!user) {
            res.badRequest("Invalid Email/Password combination");
          } else {
            res.send({
              token: JWT.createToken(user),
              usertype: user.userType
            });
          }
        } else {
          res.negotiate(err);
        }
      });
    } else {
      res.badRequest('Email and Password are required');
    }
  },
  favs: function (req, res) {
    var values = {};
    values.user = req.headers.user;
    FavTattooFlashService.find(values, function (err, favs) {
      if (err) {
        res.serverError(err);
      } else {
        res.send(favs);
      }
    });
  },
  findBy: function (req, res) {
    var nameOrEmailQuery = baseQuery + " AND (LOWER(CONCAT(TRIM(User.name),' ',TRIM(User.lastname))) like ? OR LOWER(User.email) like ?)";
    var nameOrEmailParam = req.param('queryParam') || '';
    nameOrEmailParam = "%" + nameOrEmailParam.toLowerCase().trim() + "%";
    var escapedValues = [nameOrEmailParam, nameOrEmailParam];
    User.query(nameOrEmailQuery, escapedValues, function (err, results) {
      if (err) {
        res.serverError(err);
      } else {
        res.send(results);
      }
    });
  }
};
