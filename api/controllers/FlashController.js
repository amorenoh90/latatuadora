/**
 * FlashController
 *
 * @description :: Server-side logic for managing Flashes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    console.log(req.body);
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
            }
            else {
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
    }
    else {
      sql = 'select *, flash.id from flash where publicate = true';
      if (req.query.style) {
        sql = sql + ' left join flashstyle on flashstyle.flashId = flash.id';
      }
      if (req.query.element) {
        sql = sql + ' left join flashelement on flashelement.flashId = flash.id';
      }
      values = [];
      used = false;
      if (req.query.style) {
        if (!used) {
          sql = sql + " WHERE ";
          used = true;
        }
        else {
          sql = sql + " AND ";
        }
        sql = sql + "flashstyle.style = ?";
        values.push(req.query.style);
      }
      ;
      if (req.query.element) {
        if (!used) {
          sql = sql + " WHERE ";
          used = true;
        }
        else {
          sql = sql + " AND ";
        }
        sql = sql + "flashelement.element = ?";
        values.push(req.query.element);
      }
      ;
      Flash.query(sql, values, function (err, flash) {
        if (err) {
          return res.serverError(err);
        }
        else {
          if (req.query.skip && !req.query.page) {
            return res.send(flash.slice(0, req.query.skip));
          }
          if (req.query.page) {
            var paginator = (req.query.page - 1) * req.query.skip;
            var skiper = parseInt(req.query.skip) + parseInt(paginator);
            
            return res.send(flash.slice(paginator, skiper))
          }
          else {
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
      }
      else {
        return res.send(tattoos);
      }
    });
  },
  findByStudio: function (req, res) {
    var studio = req.param('id');
    Flash.find({studio: studio}).exec(function (err, flashes) {
      if (err) {
        return res.serverError(err);
      }
      else {
        return res.send(flashes);
      }
    });
  },
  approve: function (req, res) {
    var values = req.body;
    Flash.update({id: req.params.id}, values).exec(function afterwards(err, updated) {
      if (err) {
        return res.negotiate(err);
      }
      else {
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
      }
      else {
        return res.send(updated[0]);
      }
    });
  }
};
