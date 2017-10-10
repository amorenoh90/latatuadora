/**
 * TattooController
 *
 * @description :: Server-side logic for managing tattoos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var add = function add(req, res) {
  var values = req.body;
  delete req.body.image;
  values.file = req.file;
  if ((typeof values.elements) != "object") values.elements = JSON.parse(values.elements);
  if ((typeof values.styles) != "object") values.styles = JSON.parse(values.styles);
  Tattoo.create(values).exec(function (err, tattoo) {
    if (err) {
      return res.serverError(err);
    } else {
      if (err) {
        return res.badRequest(err);
      } else {
        return res.send(tattoo);
      }
    }
  });
};
var find = function find(req, res) {
  if (!req.query.style && !req.query.element && !req.query.partbody) {
    skiper = 6;
    paginator = 0;
    if (req.query.skip) skiper = req.query.skip;
    if (req.query.page) paginator = req.query.page;
    Tattoo.find({publicate: true}).paginate({
      page: paginator,
      limit: skiper
    }).populateAll().exec(function (err, tattos) {
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
  Tattoo.find({publicate: false}).populateAll().exec(function (err, tattoos) {
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
var deleteTattoo = function update(req, res) {
  var values = req.allParams();
  Tattoo.destroy({id: values.id}).exec(function (err, deleted) {
    if (err) {
      return res.negotiate(err);
    } else {
      return res.send(deleted[0]);
    }
  });
};
var findByStudio = function findByStudio(req, res) {
  var artistsIds = [];
  var studio = req.param('id');
  Artist.find({studio: studio}).then(function (artists) {
    artists.forEach(function (artist) {
      artistsIds.push(artist.id)
    });
    Tattoo.find().where({artist: artistsIds}).populateAll().exec(function (err, tattoos) {
      if (err) {
        return res.serverError(err);
      } else {
        return res.send(tattoos);
      }
    });
  }).catch(function (err) {
    return res.serverError(err);
  });
}

module.exports = {
  add: add,
  find: find,
  notApproved: notApproved,
  approve: approve,
  update: update,
  deleteTattoo: deleteTattoo,
  findByStudio: findByStudio
};
