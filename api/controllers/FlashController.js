/**
 * FlashController
 *
 * @description :: Server-side logic for managing Flashes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    var sellimg;
    var values = req.allParams();

    if ((typeof values.elementId) != "object") values.elementId = JSON.parse(values.elementId);
    if ((typeof values.styleId) != "object") values.styleId = JSON.parse(values.styleId);
    Flash.create(values)
      .then(function (flash) {
        return flash;
      })
      .then(function (flash) {
        var elements = [];
        for (var i = 0; i < values.elementId.length; i++) {
          elements.push({
            element: values.elementId[i],
            flashId: flash.id
          });
        }
        var styles = [];
        for (var i = 0; i < values.styleId.length; i++) {
          styles.push({
            style: values.styleId[i],
            flashId: flash.id
          });
        }

        FlashElement.createEach(elements)
          .then(function (flashelement) {
            return flashelement;
          });
        var style = FlashStyle.createEach(styles)
          .then(function (flashstyle) {
            return flashstyle;
          });
        return flash;
      })
      .then(function (flash) {
        Flash.addRealImg(req.file, flash.id, function (err, real) {
          if (err) {
            return res.serverError(err);
          }
          if (real) {
            flash.realImageUrl = real[0].realImageUrl;
          }
          Flash.addSellImg(req.file, flash.id, function (err, sell) {
            if (err) {
              res.serverError(err);
            }
            if (sell === null) {
              return res.send(flash);
            } else {
              flash.sellImageUrl = sell[0].sellImageUrl;
              return res.send(flash);
            }
          });
        });
      })
      .catch(function (err) {
        return res.serverError(err);
      });
  },

  find: function (req, res) {
    if (!req.query.style && !req.query.element && !req.query.bodypart) {
      skiper = 6;
      paginator = 0;
      if (req.query.skip) skiper = req.query.skip;
      if (req.query.page) paginator = req.query.page;
      Flash.find({
        publicate: true
      }).paginate({
        page: paginator,
        limit: skiper
      })
        .populateAll()
        .exec(function (err, flash) {
          if (err) {
            return res.serverError(err);
          }
          return res.send(flash);
        });
    } else {
      sql = 'select *, Flash.id from Flash ';
      if (req.query.style) {
        sql = sql + ' left join FlashStyle on FlashStyle.flashId = flash.id';
      }
      if (req.query.element) {
        sql = sql + ' left join FlashElement on FlashElement.flashId = flash.id';
      }
      values = [];
      used = true;
      if (req.query.style) {
        if (!used) {
          sql = sql + " WHERE ";
          used = true;
        } else {
          sql = sql + " AND ";
        }
        sql = sql + " FlashStyle.style = ? ";
        values.push(parseInt(req.query.style));
      }
      if (req.query.element) {
        if (!used) {
          sql = sql + " WHERE ";
          used = true;
        } else {
          sql = sql + " AND ";
        }
        sql = sql + " FlashElement.element = ? ";
        values.push(parseInt(req.query.element));
      }
      if (!used) {
        sql = " WHERE publicate = true ";
      } else {
        sql = " AND publicate = true";
      }
      Flash.query(sql, values, function (err, flash) {
        if (err) {
          return res.serverError(err);
        } else {
          if (req.query.skip && !req.query.page) {
            return res.send(flash.slice(0, req.query.skip));
          }
          if (req.query.page) {
            var paginator = (req.query.page - 1) * req.query.skip;
            var skiper = parseInt(req.query.skip) + parseInt(paginator);

            return res.send(flash.slice(paginator, skiper))
          } else {
            return res.send(flash);
          }
        }
      });
    }
  },

  notApproved: function (req, res) {
    Flash.find({
      publicate: false
    })
      .populateAll()
      .exec(function (err, tattoos) {
        if (err) {
          return res.serverError(err);
        } else {
          return res.send(tattoos);
        }
      });
  },

  findByStudio: function (req, res) {
    var artistsIds = [];
    Artist.find({
      studio: req.param('id')
    }).then(function (artists) {
      artists.forEach(function (artist) {
        artistsIds.push(artist.id)
      });
      Flash.find()
        .populateAll()
        .where({
          artist: artistsIds
        }).exec(function (err, flashes) {
        if (err) {
          return res.serverError(err);
        } else {
          return res.send(flashes);
        }
      });
    }).catch(function (err) {
      return res.serverError(err);
    });
  },

  approve: function (req, res) {
    var values = req.body;
    Flash.update({
      id: req.params.id
    }, values).exec(function afterwards(err, updated) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.send(updated[0]);
      }
    });
  },

  update: function (req, res) {
    var values = req.body;
    delete values.approve;
    if ((typeof values.elements) != "object") values.elements = JSON.parse(values.elements);
    if ((typeof values.styles) != "object") values.styles = JSON.parse(values.styles);

    var doQuery = async () => {
      try {
        await FlashElement.destroy({flashId: values.id});
        await FlashStyle.destroy({flashId: values.id});

        var elements = [];

        for (var i = 0; i < values.elements.length; i++) {
          elements.push({
            element: values.elements[i].elementId,
            flashId: values.id
          });
        }

        var styles = [];

        for (var i = 0; i < values.styles.length; i++) {
          styles.push({
            style: values.styles[i].styleId,
            flashId: values.id
          });
        }

        await FlashElement.createEach(elements);
        await FlashStyle.createEach(styles);

        Flash.update({
          id: values.id
        }, values).exec(function afterwards(err, updated) {
          if (err) {
            return res.negotiate(err);
          } else {
            return res.send(updated[0]);
          }
        });
      } catch (exception) {
        console.log(exception);

        res.serverError(exception);
      }
    };

    doQuery();
  },

  get: function (req, res) {
    FlashService
      .get({
        input: req.allParams()
      }, function (error, result) {
        if (error) {
          res.serverError({
            error: error
          });
        } else {
          if (!result.json_response.flash) {
            res.send({
              message: result.messages.pop()
            });
          } else {
            res.send({
              flash: result.json_response.flash
            });
          }
        }
      });
  },

  getAll: function (req, res) {
    FlashService
      .getAll({
        input: req.allParams()
      }, function (error, result) {
        if (error) {
          res.serverError({
            error: error
          });
        } else {
          if (result.json_response.flashes.length < 1) {
            res.send({
              message: result.messages.pop()
            });
          } else {
            res.send({
              flashes: result.json_response.flashes
            });
          }
        }
      });
  },

  getSold: function (req, res) {
    FlashService
      .getSold({
        input: req.allParams()
      }, function (error, result) {
        if (error) {
          res.serverError({
            error: error
          });
        } else {
          if (result.json_response.flashes.length < 1) {
            res.send({
              message: result.messages.pop()
            });
          } else {
            res.send({
              flashes: result.json_response.flashes
            });
          }
        }
      });
  },

  delete: function (req, res) {
    FlashService
      .delete({
        input: req.allParams()
      }, function (error, result) {
        if (error) {
          res.serverError({
            error: error
          });
        } else {
          if (result.json_response.flashes.length < 1) {
            res.send({
              message: result.messages.pop()
            });
          } else {
            res.send({
              flashes: result.json_response.flashes
            });
          }
        }
      });
  },

  publish: function (req, res) {
    FlashService
      .publish({
        input: req.allParams()
      }, function (error, result) {
        if (error) {
          res.serverError({
            error: error
          });
        } else {
          if (result.json_response.flashes.length < 1) {
            res.send({
              message: result.messages.pop()
            });
          } else {
            res.send({
              flashes: result.json_response.flashes
            });
          }
        }
      });
  }
};
