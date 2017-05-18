/**
 * TattooController
 *
 * @description :: Server-side logic for managing tattoos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res) {

    var newtattoo={
      name: req.body.name,
      image:req.body.image,
      tattootype:req.body.tattootype,
      partbody: req.body.partbody,
      element: req.body.element,
      dimensionsX: req.body.dimensionsX,
      dimensionsY: req.body.dimensionsY,
      publicate: req.body.publicate
    }

    Tattoo.create(newtattoo).exec(function (err, records){
      if (err) {
        res.send(500, 'Error');
        sails.log(err)
      } else { // For check new Tattoo in DB
        Tattoo.findOne(newtattoo).exec(function (err, record) {
          if(err)  sails.log("2");
          if(!record) res.send(404, "Could not find Tattoo")
          else res.send(200, 'nice');
        })
      }
    });

  },

  get: function (req, res) {
    Tattoo.find().populate('partbody').populate('tattootype').populate('element')
      .exec(function(err, tattoos) {
        if(err) {
          res.send('error');
        }
        res.send(200, tattoos);
       
      });
  },
  getOne: function (req, res) { 
    var idreq= req.body.idreq;
    Tattoo.findOne({id: idreq}).populate('partbody').populate('tattootype').populate('element')
      .exec(function(err, tattoo) {
        if(err) {
          res.send('error');
        }
        res.send(200, tattoo);
       
      });
  },
  update: function (req, res) { 
    var idupd= req.body.id;
    var updatedtattoo=  { 
      name: req.body.name,
      image:req.body.image,
      tattootype:req.body.tattootype,
      partbody: req.body.partbody,
      element: req.body.element,
      dimensionsX: req.body.dimensionsX,
      dimensionsY: req.body.dimensionsY,
      publicate: req.body.publicate
    }
    Tattoo.update({"id": idupd}, updatedtattoo)
      .exec(function (err, updated) {
        if(err) {
          res.send('error');
        }
        res.send(200, updated[0]);
       
      });
  },
  delete: function(req, res){
    var idel = req.body.id;
    Tattoo.destroy({id:idel}).exec(function (err, deleted){
      if (err) { return res.negotiate(err); }
      else{
       res.send(200, deleted); 
      }
    });
  }
};

 