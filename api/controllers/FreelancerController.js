module.exports = {
  rateFreelancer: function (req, res) {
    var values = {
      id: req.query.id,
      rank: (req.query.rank || 0)
    };

    var query = {
      id: values.id
    };
    Freelancer.findOne(query).then(function (freelancer) {
      var updatedProperties = {
        count: freelancer.count + 1,
        totalSum: freelancer.totalSum + parseFloat(values.rank)
      };
      Freelancer.update(query, updatedProperties).then(function (result) {
        return res.send(result);
      });
    }).catch(function (err) {
      return res.serverError(err);
    });
  },

  getAll: function (req, res) {
    FreelancerService
      .getAll({
        input: req.allParams()
      }, function (err, result) {
        if (err) {
          res.serverError({
            err: err,
            message: result.messages.pop()
          });
        } else {
          res.send({
            freelancers: result.json_response.freelancers
          });
        }
      });
  },

  getNearby: function (req, res) {
    FreelancerService
      .getNearby({
        input: req.allParams()
      }, function (err, result) {
        if (err) {
          res.serverError({
            err: err
          });
        } else {
          res.send({
            jobbers: result.json_response.jobbers
          });
        }
      });
  },

  getPaid: function (req, res) {
    FreelancerService
      .getPaid({
        input: req.allParams()
      }, function (err, result) {
        if (err) {
          res.serverError({
            err: err
          });
        } else {
          if (result.json_response.paid_jobbers.length < 1) {
            res.send({
              message: result.messages.pop()
            });
          } else {
            res.send({
              paid_jobbers: result.json_response.paid_jobbers
            });
          }

        }
      });
  }
};
