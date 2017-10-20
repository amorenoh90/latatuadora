/**
 * QuotationController
 */
var constants = require('../Constants');

module.exports = {

  /**
   * (POST /quotation)
   */
  // TODO add wrapper or middleware for token verification if needed
  quotation: function (req, res) {
    if (req.headers['x-authorization']) {
      var token = req.headers['x-authorization'];
      JWT.verifyToken(token, function (err, decoded) {
        if (err) {
          return res.forbidden({
            message: err.message
          });
        }
        if (decoded.typ != constants.userType.user) {
          return res.forbidden({
            message: constants.messages.ACCESS_FORBIDDEN
          });
        } else {
          User.findOne({
            id: decoded.sub
          }).exec(function (err, user) {
            if (err) {
              return res.serverError(err);
            }
            if (!user) {
              return res.notFound(constants.messages.NO_SUCH_USER);
            } else {
              req.body.newUser = user;
              req.body.file = req.file;
              QuotationService.createQuotation(req.body, function (err, quotation) {
                if (err) {
                  return res.serverError(err);
                } else {
                  return res.send(quotation);
                }
              });
            }
          });
        }
      });
    } else {
      var newuser = {
        name: req.body.name,
        email: req.body.email,
        telephone: req.body.telephone,
        userType: constants.userType.quotient
      };
      req.body.newUser = newuser;
      req.body.file = req.file;
      QuotationService.createQuotation(req.body, function (err, quotation) {
        if (err) {
          return res.serverError(err);
        } else {
          return res.send(quotation);
        }
      });
    }
  },
  findByStudio: function (req, res) {
    var studio = req.headers.studio.id;
    Quotation.find({
      studioId: studio
    }).populate(['styleId', 'bodypartId', 'userId', 'references']).exec(function (err, quotations) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send(quotations);
      }
    });
  },
  findByFreelance: function (req, res) {
    var freelancerId = req.headers.freelancer.id;
    Quotation.find({
      freelancerId: freelancerId
    }).populate(['styleId', 'bodypartId', 'userId', 'references']).exec(function (err, quotations) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send(quotations);
      }
    });
  },
  find: function (req, res) {
    Quotation.find().paginate({
      page: req.query.page,
      limit: req.query.limit
    }).populate(['styleId', 'bodypartId', 'userId', 'freelancerId', 'studioId']).exec(function (err, quotations) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send(quotations);
      }
    });
  }
};
