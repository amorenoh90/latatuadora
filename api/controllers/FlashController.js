/**
 * FlashController
 *
 * @description :: Server-side logic for managing Flashes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  add: function (req, res){
      var sellimg;
      Flash.create(req.body)
        .then(function (flash){
          return flash;
        })
        .then(function (flash) {
          var element = FlashElement.create({element: req.body.elementId, flashId: flash.id})
            .then(function (flashelement){
              return flashelement;
            });
          var style = FlashStyle.create({style: req.body.styleId, flashId: flash.id})
            .then(function (flashstyle){
              return flashstyle;
            });
          return flash;
        })
        .then(function (flash) {
          Flash.addRealImg(req.file, flash.id, function (err, real) {
            if(err){
              return res.serverError(err);
            }
            if(real){
              flash.realImageUrl = real[0].realImageUrl;
            }
            Flash.addSellImg(req.file, flash.id, function (err, sell) {
              if(err){
                res.serverError(err);
              }
              if(sell === null){
                return res.send(flash);
              }
              else{
                flash.sellImageUrl = sell[0].sellImageUrl;
                return res.send(flash);
              }
            });
          });
        })
        .catch(function (err) {
          return res.serverError(err);
        });
  }
};