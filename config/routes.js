/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/



  //>Routes Quotation

  'post /quotation': 'QuotationController.quotation',
  'get /quotation/studio': 'QuotationController.findByStudio',
  'get /quotation': 'QuotationController.find',
  //<Routes Quotation

  //>User login
  'post /logup': 'UserController.logup',
  'post /login': 'UserController.login',
  //<User login

  //>Tattoo Routes
  'post /tattoo': 'TattooController.add',
  'get /tattoo': 'TattooController.find',
  'put /tattoo/approve/:id': 'TattooController.approve',
  'put /tattoo/:id': 'TattooController.update',
  'get /tattoo/notApproved': 'TattooController.notApproved',
  'get /tattoo/studio/:id': 'TattooController.findByStudio',
  'get /tattoo/bodyParts': 'BodyPartController.find',
    ////favorites
  'post /tattoofav': 'FavoriteTattoo.add',
  'get /tattoofav': 'FavoriteTattoo.consult',
  'get /tattoofav/count': 'FavoriteTattoo.countFavorites',
  'delete /tattoofav': 'FavoriteTattoo.remove',
  //<Tattoo Routes

  //>Flash Routes
  'post /flash': 'FlashController.add',
  'get /flash': 'FlashController.find',
  'get /flash/studio/:id': 'FlashController.findByStudio',
  'put /flash/approve/:id': 'FlashController.approve',
  'put /flash/:id': 'FlashController.update',
  'get /flash/notApproved': 'FlashController.notApproved',
    ////Favorites
  'post /flashfav': 'FavoriteFlash.add',
  'get /flashfav': 'FavoriteFlash.consult',
  'delete /flashfav': 'FavoriteFlash.remove',
  //<Flash Routes
  //>Favs
  'get /favs': 'UserController.favs',
  //<Favs
  //Routes Conekta
  'get /conekta':{
    view: 'pagoconekta'
  },
  'post /conekta': 'PaymentsController.conekta',
  //<Routes Conekta
  //Routes PayPal
  'get /paypal':{
    view: 'pagopaypal'
  },
  'post /paypal': 'PaymentsController.paypal',
  'get /paypalexecute': 'PaymentsController.paypalExecute',
  'get /paypalcancel': 'PaymentsController.paypalCancel',
  'get /aceptplan': 'PaymentsController.paypalAceptPlan',
  'get /cancelplan': 'PaymentsController.paypalCancelPlan',
  //<Routes PayPal

  //>Routes ComproPago
  'post /compropago': 'PaymentsController.compropagoCharge',
  'get /compropagooptions': 'PaymentsController.compropagoOptions',
  'get /compropago': {
    view: 'compropagocharge'
  },
  'post /compropagopay': 'PaymentsController.compropagoPay',
  //<Routes ComproPago
  //>Routes Artist
  'put /artist': 'ArtistController.update',
  //<Routes Artist
  //>Carrousel
  'post /carrousel': 'CarrouselController.create',
  //<Carrousel
  //>Studio Favs
  'post /studiofav': 'FavoriteStudio.add',
  'get /studiofav': 'FavoriteStudio.consult',
  'get /studiofav/count': 'FavoriteStudio.countFavorites',
  'delete /studiofav': 'FavoriteStudio.remove',
  //<Studio Favs
  //>Freelancer Favs
  'post /freelancerfav': 'FavoriteFreelancer.add',
  'get /freelancerfav': 'FavoriteFreelancer.consult',
  'get /freelancerfav/count': 'FavoriteFreelancer.countFavorites',
  'delete /freelancerfav': 'FavoriteFreelancer.remove',
  //<Freelancer Favs
  //>address
  'get /address/studioAddress': 'AddressController.studioAddress',
  'get /address/freelanceAddress': 'AddressController.freelanceAddress',
  'get /address/userAddress': 'AddressController.userAddress',
  //<address
  //>styles
  'get /styles': 'StyleController.find',
  //<style
  //>Studio
  'post /studio/rate': 'StudioController.rateStudio',
  //<Studio
  //>Freelancer
  'post /freelancer/rate': 'FreelancerController.rateFreelancer',
  //<Freelancer
};
