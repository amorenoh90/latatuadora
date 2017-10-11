module.exports = {
  get: function (values, done) {
    var input = values.input || {},
      result = {
        messages: [],
        json_response: {},
        errors: []
      };

    var doQuery = async (cb) => {
      try {
        var tattoo = await Tattoo
          .find({
            id: input.tattoo
          })
          .sort('id ASC')
          .populateAll();

        if (tattoo.length < 1) result.messages.push(messages.NO_TATTOOS_UNDER_CRITERIA);

        result.json_response.tattoo = tattoo[0];
      } catch
        (error) {
        result.messages = [];
        result.errors.push(error);
      }
      finally {
        cb(result.errors.pop(), result);
      }
    };

    doQuery(done);
  },
};
