/**
 * TypeTattooController
 *
 * @description :: Server-side logic for managing Typetattoos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add: function (req, res) {
	  var newtypetattoo={
	    type: req.body.typetattoo
    }
    TypeTattoo.create(newtypetattoo).exec(function (err, records) {
      if (err) {
        res.send(500, 'Error');
      }
      else {
        TypeTattoo.findOne(newtypetattoo).exec(function (err, record) { //For check new TypeTattoo in DB
          if(err) res.send(500, 'Error');
          if(!record) res.send(404, "Could not find TypeTattoo")
          else res.send(200, 'nice');
        })
      }
    });
  }
};

