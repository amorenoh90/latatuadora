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
  if (!req.query.style && !req.query.element && !req.query.partbody) {
    skiper = 6;
    paginator = 0;
    if (req.query.skip) skiper = req.query.skip;
    if (req.query.page) paginator = req.query.page;
    Tattoo.find({publicate: true}).paginate({page: paginator, limit: skiper}).populate('styles').populate('elements').exec(function (err, tattos) {
      if (err) {
        return res.serverError(err);
      }
      return res.send(tattos);
    });
  } else {
    sql = "SELECT " +
      "DISTINCT tattoo.id " +
      "FROM Tattoo tattoo " +
      "LEFT JOIN TattooStyle tattooStyle ON tattooStyle.tattooId = tattoo.id " +
      "LEFT JOIN TattooElement tattooElement ON tattooElement.tattooId = tattoo.id ";
    values = [];
    used = false;
    if (req.query.style) {
      if (!used) {
        sql = sql + " WHERE ";
        used = true;
      } else {
        sql = sql + " AND ";
      }
      sql = sql + "tattooStyle.styleId = ?";
      values.push(parseInt(req.query.style));
    }
    if (req.query.partbody) {
      if (!used) {
        sql = sql + " WHERE ";
        used = true;
      } else {
        sql = sql + " AND ";
      }
      sql = sql + "tattoo.partbody = ?";
      values.push(parseInt(req.query.partbody));
    }
    if (req.query.element) {
      if (!used) {
        sql = sql + " WHERE ";
        used = true;
      } else {
        sql = sql + " AND ";
      }
      sql = sql + "tattooElement.elementId = ?";
      values.push(parseInt(req.query.element));
    }
    // just all published tattoos
    if (!used) {
      sql = sql + " WHERE ";
      used = true;
    } else {
      sql = sql + " AND ";
    }
    sql = sql + " tattoo.publicate = true";
    
    sql += " GROUP BY tattoo.id";
    console.log("SQL >> ", sql);
    Tattoo.query(sql, values, function (err, tattooIds) {
      if (err) {
        return res.serverError(err);
      } else {
        var tattooIdsList = [];
        tattooIds.forEach(function (rawElement) {
          tattooIdsList.push(rawElement.id);
        });
        //
        Tattoo.find().where({id: tattooIdsList}).populate('styles').populate('elements').then(function (tattoos) {
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
        });
      }
    });
  }
};
var notApproved = function notApproved(req, res) {
  Tattoo.find({publicate: false}).populate('styles').populate('elements').exec(function (err, tattoos) {
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
  var artistsIds = [];
  Artist.find({studio: req.param('id')}).then(function (artists) {
    artists.forEach(function (artist) {
      artistsIds.push(artist.id)
    });
    Tattoo.find().where({artist: artistsIds}).populate('styles').populate('elements').exec(function (err, tattoos) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send(tattoos);
      }
    });
  }).catch(function (err) {
    return res.serverError(err);
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
