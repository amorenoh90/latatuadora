/**
 * FlashController
 *
 * @description :: Server-side logic for managing Flashes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    var sellimg;
    Flash.create(req.body)
      .then(function (flash) {
        return flash;
      })
      .then(function (flash) {
        var element = FlashElement.create({element: req.body.elementId, flashId: flash.id})
          .then(function (flashelement) {
            return flashelement;
          });
        var style = FlashStyle.create({style: req.body.styleId, flashId: flash.id})
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
      Flash.find({publicate: true}).paginate({page: paginator, limit: skiper}).exec(function (err, flash) {
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
      if(!used) {
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
    Flash.find({publicate: false}).exec(function (err, tattoos) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send(tattoos);
      }
    });
  },
  findByStudio: function (req, res) {
    var artistsIds = [];
    Artist.find({studio: req.param('id')}).then(function (artists) {
      artists.forEach(function (artist) {
        artistsIds.push(artist.id)
      });
      Flash.find().where({artist: artistsIds}).exec(function (err, flashes) {
        if (err) {
          return res.serverError(err);
        } else {
          return res.send(flashes);
        }
      });
    }).catch(function (err) {
      return res.serverError(err);
    });
    var studio = req.param('id');
  },
  approve: function (req, res) {
    var values = req.body;
    Flash.update({id: req.params.id}, values).exec(function afterwards(err, updated) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.send(updated[0]);
      }
    });
  },
  update: function (req, res) {
    var values = req.body;
    if (values.approve) {
      delete values.approve;
    }
    Flash.update({id: req.params.id}, values).exec(function afterwards(err, updated) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.send(updated[0]);
      }
    });
  }
};
