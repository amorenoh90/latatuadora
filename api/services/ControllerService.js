module.exports = {
  done: function (options) {
    var res = options.res,
      result = options.result;

    if (result.errors.length > 0) {
      res.serverError(result);
    } else {
      res.send(result);
    }
  },

  doOperation: function (options) {
    var req = options.req,
      res = options.res,
      operation = options.operation;

    var args = {
        req: req,
        input: req.allParams()
      },
      result = {};

    operation(args, function (result) {
      ControllerService
        .done({
          res: res,
          result: result
        });
    });
  },

  newResultSet: function () {
    return {
      messages: [],
      json_response: {},
      errors: []
    };
  }
};
