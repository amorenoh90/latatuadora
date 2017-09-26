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
  }
};
