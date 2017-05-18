/**
 * TypeTattooController
 *
 * @description :: Server-side logic for managing Typetattoos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  add: function (req, res) {
    var type={
      type: req.body.type
    }
    TypeTattoo.create(type).exec(function (err, records) {
      if (err) {
        res.send(500, 'Error');
      }
      else { // For check new TypeTattoo in DB
            TypeTattoo.findOne(type).exec(function (err, record) {
              if(err) res.send(500, 'Error');
              if(!record) res.send(404, "Could not find TypeTattoo")
              else res.send(200, 'nice');
            })
      }
    });
  },
  get: function (req, res) {
    TypeTattoo.find().exec(function(err, types) {
        if(err) {
          res.send('error');
        }
        res.send(200, types);
       
      });
  },
  update: function (req, res) { 
    var id= req.body.id;
    var updatedtype=  { 
      type: req.body.type
    }
    TypeTattoo.update({"id": id}, updatedtype)
      .exec(function (err, updated) {
        if(err) {
          res.send('error');
        }
        res.send(200, updated[0]);
       
      });
  },
  getOne: function (req, res) { 
    var id= req.body.id;
    TypeTattoo.findOne({id: id})
      .exec(function(err, type) {
        if(err) {
          res.send('error');
        }
        else{
          res.send(200, type);  
        }
        
       
      });
  },
  delete: function(req, res){
    var id = req.body.id;
    TypeTattoo.destroy({id:id}).exec(function (err, deleted){
      if (err) { return res.negotiate(err); }
      else{
       res.send(200, deleted); 
      }
    });
  }

};

