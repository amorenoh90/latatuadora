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
            message: result.messages.pop()
          });
        } else {
          res.send({
            message: result.messages.pop()
          });
        }
      });
  },

  getAllAsFreelancer: function (req, res) {
    var args = {
        req: req,
        input: {}
      },
      result = {};

    req.headers.user = req.headers.user || 0;

    args.input.jobber = req.headers.user.id;

    ItineraryService
      .getAll(args, function (err, result) {
        if (err) {
          res.serverError({
            err: err,
            message: result.messages.pop(),
            itineraries: result.json_response.itineraries
          });
        } else {
          res.send({
            message: result.messages.pop(),
            itineraries: result.json_response.itineraries
          });
        }
      });
  },

  getAllAsStudio: function (req, res) {
    var args = {
        req: req,
        input: {}
      },
      result = {};

    req.headers.user = req.headers.user || 0;

    args.input.jobber = req.headers.user.id;

    ItineraryService
      .getAll(args, function (err, result) {
        if (err) {
          res.serverError({
            err: err,
            message: result.messages.pop(),
            itineraries: result.json_response.itineraries
          });
        } else {
          res.send({
            message: result.messages.pop(),
            itineraries: result.json_response.itineraries
          });
        }
      });
  },

  getAllAsClient: function (req, res) {
    var args = {
        req: req,
        input: {}
      },
      result = {};

    req.headers.user = req.headers.user || 0;

    args.input.client = req.headers.user.id;

    ItineraryService
      .getAll(args, function (err, result) {
        if (err) {
          res.serverError({
            err: err,
            message: result.messages.pop(),
            itineraries: result.json_response.itineraries
          });
        } else {
          res.send({
            message: result.messages.pop(),
            itineraries: result.json_response.itineraries
          });
        }
      });
  },

  getAllAsAdmin: function (req, res) {
    var args = {
        req: req,
        input: {}
      },
      result = {};

    ItineraryService
      .getAll(args, function (err, result) {
        if (err) {
          res.serverError({
            err: err,
            message: result.messages.pop(),
            itineraries: result.json_response.itineraries
          });
        } else {
          res.send({
            message: result.messages.pop(),
            itineraries: result.json_response.itineraries
          });
        }
      });
  }
};
