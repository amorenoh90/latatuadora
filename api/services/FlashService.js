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
  get: function (values, done) {
    var input = values.input || {},
      result = {
        messages: [],
        json_response: {},
        errors: []
      };

    var doQuery = async (cb) => {
      try {
        var flash = await Flash
          .find({
            id: input.flash
          })
          .sort('id ASC')
          .populateAll();

        if (flash.length < 1) result.messages.push(messages.NO_FLASHES_UNDER_CRITERIA);

        flash = flash[0];

        flash.styles = [];
        flash.elements = [];

        for (var i = 0; i < flash.styleId.length; i++) {
          flash.styles[i] = (await Style
            .find({
              id: flash.styleId[i].style
            })
            .populateAll())[0];
        }

        for (var i = 0; i < flash.elementId.length; i++) {
          flash.elements[i] = (await Element
            .find({
              id: flash.elementId[i].element
            })
            .populateAll())[0];
        }

        result.json_response.flash = flash;
      } catch (error) {
        result.messages = [];
        result.errors.push(error);
      }
      finally {
        cb(result.errors.pop(), result);
      }
    };

    doQuery(done);
  },

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
  },

  getSold: function (options, done) {
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
              .find({
                sell: true
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
