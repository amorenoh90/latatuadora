var constants = require('../Constants.js'),
  messages = constants.messages;

function fillJSON(json, properties) {
  var result = {};

  for (var i in properties) {
    if (json[properties[i]]) result[properties[i]] = json[properties[i]];
  }

  return result;
}

function getPropertyArray(array, property) {
  var result = [];

  for (var i = 0; i < array.length; i++) {
    var element = array[i];

    result.push(element[property]);
  }

  return result;
}

module.exports = {
  getAll: function (options, done) {
    var input = options.input || {},
      result = {
        messages: [],
        json_response: {},
        errors: []
      };
    input.element = input.element || 0,
      input.style = input.style || 0;

    var doQuery = async (cb) => {
        try {
          var flash_elements = await
              FlashElement
                .find({
                  element: input.element
                }),
            flash_styles = await
              FlashStyle
                .find({
                  style: input.style
                });

          var flashes = flash_elements.concat(flash_styles);
          flashes = getPropertyArray(flashes, "flashId");

          flashes = await
            Flash
              .find({
                publicate: true,
                id: flashes
              })
              .sort('createdAt DESC')
              .populateAll();

          if (flashes.length < 1) result.messages.push(messages.NO_FLASHES_UNDER_CRITERIA);

          result.json_response.flashes = flashes;
        } catch
          (error) {
          result.messages = [];
          result.errors.push(error);
        }
        finally {
          cb(result.errors.pop(), result);
        }
      }
    ;

    doQuery(done);
  },

  delete: function (options, done) {
    var input = options.input || {},
      result = {
        messages: [],
        json_response: {},
        errors: []
      };

    var doQuery = async (cb) => {
        try {
          var flashes = await
            Flash
              .destroy({
                publicate: true,
                id: input.flash
              });

          if (flashes.length < 1) result.messages.push(messages.NO_FLASHES_UNDER_CRITERIA);

          result.json_response.flashes = flashes;
        } catch (error) {
          result.messages = [];
          result.errors.push(error);
        } finally {
          cb(result.errors.pop(), result);
        }
      }
    ;

    doQuery(done);
  },

  publish: function (options, done) {
    var input = options.input || {},
      result = {
        messages: [],
        json_response: {},
        errors: []
      };

    var doQuery = async (cb) => {
        try {
          var flashes = await
            Flash
              .update({
                publicate: false,
                id: input.flash
              }, {
                publicate: true
              });

          if (flashes.length < 1) result.messages.push(messages.NO_FLASHES_UNDER_CRITERIA);

          result.json_response.flashes = flashes;
        } catch (error) {
          result.messages = [];
          result.errors.push(error);
        } finally {
          cb(result.errors.pop(), result);
        }
      }
    ;

    doQuery(done);
  }
};
