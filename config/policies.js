module.exports.policies = {
  // '*': true,
  'favoritetattoo': {
    'add': 'sessionAuth',
    'consult': 'sessionAuth',
    'remove': 'sessionAuth',
    'find': true,
    findOne: true
  },
  'favoriteflash': {
    'add': 'sessionAuth',
    'consult': 'sessionAuth',
    'remove': 'sessionAuth',
    'find': true,
    findOne: true
  },
  'favoriteflash': {
    'add': 'userSessionAuth',
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
    findBy: 'adminSessionAuth'
  },
  'PaymentsController': {
    '*': 'sessionAuth',
    'compropagopay': true,
    compropagooptions: true,
    paypalAceptPlan: true,
    paypalCancelPlan: true,
    paypalCancel: true
  },
  ArtistController: {
    'update': 'studioSessionAuth',
    find: true,
    findOne: true,
    rateArtist: true,
    rate: true
  },
  Awards: {
    '*': 'studioSessionAuth',
    find: true
  },
  Carrousel: {
    '*': 'studioSessionAuth',
    find: true
  },
  Quotation: {
    findByStudio: 'studioSessionAuth'
  },
  Tattoo: {
    add: 'freelancerorStudioSessionAuth',
    approve: 'adminSessionAuth',
    find: true,
    notApproved: 'adminSessionAuth'
  },
  FavoriteStudio: {
    add: 'userSessionAuth',
    remove: 'userSessionAuth',
    consult: 'userSessionAuth',
    find: true
  },
  FavoriteFreelancer: {
    add: 'userSessionAuth',
    remove: 'userSessionAuth',
    consult: 'userSessionAuth',
    find: true
  },
  Flash: {
    add: 'freelancerorStudioSessionAuth',
    update: 'freelancerorStudioSessionAuth',
    find: true,
    notApproved: 'adminSessionAuth'
  },
  ItineraryController: {
    getAllAsFreelancer: 'FreelancerSessionAuth',
    getAllAsStudio: 'StudioSessionAuth',
    getAllAsClient: 'UserSessionAuth',
    getAllAsAdmin: 'AdminSessionAuth'
  }
};
