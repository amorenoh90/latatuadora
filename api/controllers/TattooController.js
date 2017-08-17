/**
 * TattooController
 *
 * @description :: Server-side logic for managing tattoos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var add = function add(req, res) {
  Tattoo.create(req.body).exec(function (err, tattoo) {
    if (err) {
      return res.serverError(err);
    } else {
      Tattoo.addImg(req.file, tattoo.id, function (err, done) {
        if (err) {
          res.badRequest(err);
        } else {
          if (done === null) {
            return res.send([tattoo])
          } else {
            return res.send(done)
          }
        }
      })
    }
  });
};
var find = function find(req, res) {
  if (!req.query.style && !req.query.element && !req.query.bodypart) {
    skiper = 6;
    paginator = 0;
    if (req.query.skip) skiper = req.query.skip;
    if (req.query.page) paginator = req.query.page;
    Tattoo.find({publicate: true}).paginate({page: paginator, limit: skiper}).exec(function (err, tattos) {
      if (err) {
        return res.serverError(err);
      }
      return res.send(tattos);
    });
  } else {
    sql = 'SELECT * FROM Tattoo where publicate = true';
    values = [];
    used = true;
    if (req.query.style) {
      if (!used) {
        sql = sql + " WHERE ";
        used = true;
      } else {
        sql = sql + " AND ";
      }
      sql = sql + "style = ?";
      values.push(parseInt(req.query.style));
    }
    if (req.query.bodypart) {
      if (!used) {
        sql = sql + " WHERE ";
        used = true;
      } else {
        sql = sql + " AND ";
      }
      sql = sql + "partbody = ?";
      values.push(parseInt(req.query.bodypart));
    }
    if (req.query.element) {
      if (!used) {
        sql = sql + " WHERE ";
        used = true;
      } else {
        sql = sql + " AND ";
      }
      sql = sql + "element = ?";
      values.push(parseInt(req.query.element));
    }
    Tattoo.query(sql, values, function (err, tattoos) {
      if (err) {
        return res.serverError(err);
      } else {
        if (req.query.skip && !req.query.page) {
          return res.send(tattoos.slice(0, req.query.skip));
        }
        if (req.query.page) {
          var paginator = (req.query.page - 1) * req.query.skip;
          var skiper = parseInt(req.query.skip) + parseInt(paginator);
          
          return res.send(tattoos.slice(paginator, skiper))
        } else {
          return res.send(tattoos);
        }
      }
    });
  }
};
var notApproved = function notApproved(req, res) {
  Tattoo.find({publicate: false}).exec(function (err, tattoos) {
    if (err) {
      return res.serverError(err);
    } else {
      return res.send(tattoos);
    }
  });
};
var approve = function approve(req, res) {
  var values = req.body;
  Tattoo.update({id: req.params.id}, values).exec(function afterwards(err, updated) {
    if (err) {
      return res.negotiate(err);
    } else {
      return res.send(updated[0]);
    }
  });
};
var update = function update(req, res) {
  var values = req.body;
  if (values.approve) {
    delete values.approve;
  }
  Tattoo.update({id: req.params.id}, values).exec(function afterwards(err, updated) {
    if (err) {
      return res.negotiate(err);
    } else {
      return res.send(updated[0]);
    }
  });
};
var findByStudio = function findByStudio(req, res) {
  Tattoo.find({studio: req.param('id')}).exec(function (err, tattoos) {
    if (err) {
      return res.serverError(err);
    } else {
      return res.send(tattoos);
    }
  });
};

module.exports = {
  add: add,
  find: find,
  notApproved: notApproved,
  approve: approve,
  update: update,
  findByStudio: findByStudio
};
