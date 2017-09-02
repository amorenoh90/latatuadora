/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  'favoritetattoo': {
    'add':'sessionAuth',
    'consult': 'sessionAuth',
    'remove': 'sessionAuth',
    'find': true,
    findOne: true
  },
  'favoriteflash': {
    'add':'sessionAuth',
    'consult': 'sessionAuth',
    'remove': 'sessionAuth',
    'find': true,
    findOne: true
  },
  'favoriteflash': {
    'add':'userSessionAuth',
    'consult': 'userSessionAuth',
    'remove': 'userSessionAuth',
    find: true,
    findOne: true
  },
  MembershipsController: {
    //'create': 'adminSessionAuth'
  },
  UserController: {
    'favs': 'userSessionAuth',
    findBy:'adminSessionAuth'
  },
  'PaymentsController': {
    '*': 'sessionAuth',
    'compropagopay': true,
    compropagooptions: true,
    paypalAceptPlan: true,
    paypalCancelPlan: true,
    paypalCancel: true
  },
  ArtistController:{
    'update': 'studioSessionAuth',
    find: true,
    findOne: true,
    rateArtist: true,
    rate: true
  },
  Awards:{
    '*': 'studioSessionAuth',
    find: true
  },
  Carrousel:{
    '*': 'studioSessionAuth',
    find: true
  },
  Quotation:{
    findByStudio: 'studioSessionAuth'
  },
  Tattoo:{
    add:'freelancerorStudioSessionAuth',
    approve: 'adminSessionAuth',
    find: true,
    notApproved: 'adminSessionAuth'
  },
  FavoriteStudio:{
    add: 'userSessionAuth',
    remove:'userSessionAuth',
    consult: 'userSessionAuth',
    find:true
  },
  FavoriteFreelancer:{
    add: 'userSessionAuth',
    remove:'userSessionAuth',
    consult: 'userSessionAuth',
    find:true
  },
  Flash:{
    add: 'freelancerorStudioSessionAuth',
    update: 'freelancerorStudioSessionAuth',
    find: true,
    notApproved:'adminSessionAuth'
  }
  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};
