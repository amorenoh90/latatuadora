/**
 * ElementController
 *
 * @description :: Server-side logic for managing Elements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {
    var element={
      element: req.body.element
    }
    Element.create(element).exec(function (err, records) {
      if (err) {
        res.send(500, 'Error');
      }
      else { // For check new Element in DB
            Element.findOne(element).exec(function (err, record) {
              if(err) res.send(500, 'Error');
              if(!record) res.send(404, "Could not find Element")
              else res.send(200, 'nice');
            })
      }
    });
  },
  get: function (req, res) {
    Element.find().exec(function(err, elements) {
        if(err) {
          res.send('error');
        }
        res.send(200, elements);
       
      });
  },
  update: function (req, res) { 
    var id= req.body.id;
    var updatedelement=  { 
      element: req.body.element
    }
    Element.update({"id": id}, updatedelement)
      .exec(function (err, updated) {
        if(err) {
          res.send('error');
        }
        res.send(200, updated[0]);
       
      });
  },
  getOne: function (req, res) { 
    var id= req.body.id;
    Element.findOne({id: id})
      .exec(function(err, element) {
        if(err) {
          res.send('error');
        }
        else{
          res.send(200, element);  
        }
        
       
      });
  },
  delete: function(req, res){
    var id = req.body.id;
    Element.destroy({id:id}).exec(function (err, deleted){
      if (err) { return res.negotiate(err); }
      else{
       res.send(200, deleted); 
      }
    });
  }

};

