/**
 * BodyPartController
 *
 * @description :: Server-side logic for managing Bodyparts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    var part={
      part: req.body.part
    }
    BodyPart.create(part).exec(function (err, records) {
      if (err) {
        res.send(500, 'Error');
      }
      else { // For check new BodyPart in DB
            BodyPart.findOne(part).exec(function (err, record) {
              if(err) res.send(500, 'Error');
              if(!record) res.send(404, "Could not find BodyPart")
              else res.send(200, 'nice');
            })
      }
    });
  },
  get: function (req, res) {
    BodyPart.find().exec(function(err, parts) {
        if(err) {
          res.send('error');
        }
        res.send(200, parts);
       
      });
  },
  update: function (req, res) { 
    var id= req.body.id;
    var updatedpart=  { 
      part: req.body.part
    }
    BodyPart.update({"id": id}, updatedpart)
      .exec(function (err, updated) {
        if(err) {
          res.send('error');
        }
        res.send(200, updated[0]);
       
      });
  },
  getOne: function (req, res) { 
    var id= req.body.id;
    BodyPart.findOne({id: id})
      .exec(function(err, part) {
        if(err) {
          res.send('error');
        }
        else{
          res.send(200, part);  
        }
        
       
      });
  },
  delete: function(req, res){
    var id = req.body.id;
    BodyPart.destroy({id:id}).exec(function (err, deleted){
      if (err) { return res.negotiate(err); }
      else{
       res.send(200, deleted); 
      }
    });
  }

};

