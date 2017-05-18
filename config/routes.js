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



  //>Routes User

   'post /user/add': 'UserController.add',

  //<Routes User

  //>Routes Tattoo
    'get /tattoo': {view: 'tattoo'},
    'post /tattoo/add': 'TattooController.add',
    'get /tattoo/get': 'TattooController.get',
    'post /tattoo/getOne': 'TattooController.getOne',
    'post /tattoo/update': 'TattooController.update',
    'delete /tattoo/delete': 'TattooController.delete',
  //<Routes Tattoo

  //>Routes TypeTattoo

    'post /typetattoo/add': 'TypeTattooController.add',
    'get /typetattoo/get': 'TypeTattooController.get',
    'post /typetattoo/getOne': 'TypeTattooController.getOne',
    'post /typetattoo/update': 'TypeTattooController.update',
    'delete /typetattoo/delete': 'TypeTattooController.delete',

  //<Routes TypeTattoo

  //>Routes BodyPart

    'post /bodypart/add': 'BodyPartController.add',
    'get /bodypart/get': 'BodyPartController.get',
    'post /bodypart/getOne': 'BodyPartController.getOne',
    'post /bodypart/update': 'BodyPartController.update',
    'delete /bodypart/delete': 'BodyPartController.delete',


  //<Routes BodyPart
  //>Routes Element

    'post /element/add': 'ElementController.add',
    'get /element/get': 'ElementController.get',
    'post /element/getOne': 'ElementController.getOne',
    'post /element/update': 'ElementController.update',
    'delete /element/delete': 'ElementController.delete',


  //<Routes BodyPart


};
