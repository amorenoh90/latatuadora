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
var get = function (req, res) {
  TattooService
    .get({
      input: req.allParams()
    }, function (error, result) {
      if (error) {
        res.serverError({
          error: error
        });
      } else {
        if (!result.json_response.tattoo) {
          res.send({
            message: result.messages.pop()
          });
        } else {
          res.send({
            tattoo: result.json_response.tattoo
          });
        }
      }
    });
};
var all = function (req, res) {
  TattooService
    .all({
      input: req.allParams()
    }, function (error, result) {
      if (error) {
        res.serverError({
          error: error
        });
      } else {
        if (!result.json_response.tattoos) {
          res.send({
            message: result.messages.pop()
          });
        } else {
          res.send({
            tattoos: result.json_response.tattoos
          });
        }
      }
    });
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
  values.file = req.file;
  if (values.elements) if ((typeof values.elements) != "object" && (typeof values.elements) != "undefined") values.elements = JSON.parse(values.elements);
  if (values.styles) if ((typeof values.styles) != "object" && (typeof values.styles) != "undefined") values.styles = JSON.parse(values.styles);

  var doQuery = async () => {
    await TattooStyle.destroy({tattooId: req.params.id});
    await TattooElement.destroy({tattooId: req.params.id});

    var elements = [];

    for (var i = 0; i < values.elements.length; i++) {
      elements.push({
        elementId: values.elements[i].elementId,
        tattooId: values.id
      });
    }

    var styles = [];

    for (var i = 0; i < values.styles.length; i++) {
      styles.push({
        styleId: values.styles[i].styleId,
        flashId: values.id
      });
    }

    await TattooElement.createEach(elements);
    await TattooStyle.createEach(styles);

    Tattoo.update({id: req.params.id}, values).exec(function afterwards(err, updated) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.send(updated[0]);
      }
    });
  }

  doQuery();
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
        var doQuery = async () => {
          for (var i = 0; i < tattoos.length; i++) {
            for (var j = 0; j < tattoos[i].styles.length; j++) {
              tattoos[i].styles[j] = (await Style
                .find({
                  id: tattoos[i].styles[j].styleId
                }))[0];
            }

            for (var j = 0; j < tattoos[i].elements.length; j++) {
              tattoos[i].elements[j] = (await Style
                .find({
                  id: tattoos[i].elements[j].elementId
                }))[0];
            }
          }

          return res.send(tattoos);
        };

        doQuery();
      }
    });
  }).catch(function (err) {
    return res.serverError(err);
  });
}

module.exports = {
  add: add,
  find: find,
  get: get,
  all: all,
  notApproved: notApproved,
  approve: approve,
  update: update,
  deleteTattoo: deleteTattoo,
  findByStudio: findByStudio
};
