module.exports = {
  add: function (req, res) {
    var args = {
        req: req,
        input: req.allParams()
      },
      result = {};

    ItineraryService
      .add(args, function (err, result) {
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
  }
};
