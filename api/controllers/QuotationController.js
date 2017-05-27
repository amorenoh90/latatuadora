/**
 * QuotationController
 *
 * @description :: Server-side logic for managing Quotations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
/**s
 * Upload References
 *
 * (POST /quotation/references)
 */
  uploadReferences: function  (req, res) {
    req.file('reference').upload({
    	maxBytes: 10000000,
    	dirname: require('path').resolve(sails.config.appPath, 'assets/references/images')
    },function (err, uploadedFiles) {
      if (err)
        return res.serverError(err);
	    else{
	    	for(i in uploadedFiles){
		    	QuotationReferences.create({imgUrl: uploadedFiles[i].fd, quotation: req.params.id}).exec(function (err, refrence){
		      	if (err) { return res.serverError(err); }
		    	});
		    }
	    }
    });
    Quotation.update({id: req.params.id},{comments: req.body.comments})
      .exec(function (err, updated){
        if (err) return res.negotiate(err);
        else{
          Quotation.findOne({ id: req.params.id }).populate('references').exec(function (err, quotation){
            if (err) {
              return res.serverError(err);
            }
            if (!quotation) {
              return res.notFound("Could not find records in the db, sorry.");
            }
             res.send(200, quotation);
          });
        }
    });
   },     
  createUser: function (req, res) {
  	User.create({
  		name: req.body.name,
  		email: req.body.email,
  		city: req.body.city,
      telephone: req.body.telephone,
  		userType: 5
  	}).exec(function (err, newuser){
  	  if (err) {res.serverError(err); }
  	  else{

  	  	Quotation.update({id: req.body.id},{userId: newuser.id}).exec(function afterwards(err, updated){
  	  	  if (err) {
  	  	    return res.serverError(err);
  	  	  }
  	  	  else{
  	  	  	Quotation.findOne({id: req.body.id}).populate('userId').populate('style').exec(function (err, quotation){
  	  	  	  if (err) {
  	  	  	    return res.serverError(err);
  	  	  	  }
  	  	  	  else{
  	  	  	  	res.send(200, quotation);
  	  	  	  }
  	  	  	});
  	  	  }
  	  	});
  	  }
  	});
  }
};