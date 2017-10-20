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

        tattoo = tattoo[0];

        for (var i = 0; i < tattoo.styles.length; i++) {
          tattoo.styles[i] = (await Style
            .find({
              id: tattoo.styles[i].styleId
            })
            .populateAll())[0];
        }

        for (var i = 0; i < tattoo.elements.length; i++) {
          tattoo.elements[i] = (await Element
            .find({
              id: tattoo.elements[i].elementId
            })
            .populateAll())[0];
        }

        result.json_response.tattoo = tattoo;
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
  all: function (values, done) {
    var input = values.input || {},
      result = {
        messages: [],
        json_response: {},
        errors: []
      };

    var doQuery = async (cb) => {
      try {
        var tattoos = await Tattoo
          .find()
          .sort('id ASC')
          //.limit(10)
          .populateAll();

        if (tattoos.length < 1) result.messages.push(messages.NO_TATTOOS_UNDER_CRITERIA);

        result.json_response.tattoos = tattoos;
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
