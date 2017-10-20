module.exports.routes = {
  '/': {
    view: 'homepage'
  },

  // Address
  'get /address/studioAddress': 'AddressController.studioAddress',
  'get /address/freelanceAddress': 'AddressController.freelanceAddress',
  'get /address/userAddress': 'AddressController.userAddress',
  'get /address/states': 'AddressController.states',
  'get /address/suburbs': 'AddressController.suburbs',
  'get /address/towns': 'AddressController.towns',

  // Artist
  'post /artist': 'ArtistController.new',
  'get /artist/:id': 'ArtistController.get',
  'put /artist': 'ArtistController.update',
  'post /artist/rate': 'ArtistController.rateArtist',
  'delete /artist': 'ArtistController.delete',

  // Carrousel
  'post /carrousel': 'CarrouselController.create',
  'get /carrousel/:id': 'CarrouselController.getByStudio',

  // ComproPago
  'post /compropago': 'PaymentsController.compropagoCharge',
  'get /compropagooptions': 'PaymentsController.compropagoOptions',
  'get /compropago': {
    view: 'compropagocharge'
  },
  'post /compropagopay': 'PaymentsController.compropagoPay',

  // Conekta
  'get /conekta': {
    view: 'pagoconekta'
  },
  'post /conekta': 'PaymentsController.conekta',

  // Element
  'get /elements': 'ElementController.getAll',

  // Email
  'post /email': 'EmailController.send',

  // Favs
  'get /favs': 'UserController.favs',

  // Flash
  'post /flash': 'FlashController.add',
  'get /flash': 'FlashController.find',
  'get /flash/get': 'FlashController.get',
  'get /flash/filter': 'FlashController.getAll',
  'get /flash/sold': 'FlashController.getSold',
  'get /flash/studio/:id': 'FlashController.findByStudio',
  'put /flash/approve/:id': 'FlashController.approve',
  'put /flash': 'FlashController.update',
  'get /flash/notApproved': 'FlashController.notApproved',
  'delete /flash': 'FlashController.delete',
  'post /flash/publish': 'FlashController.publish',

  // FlashFavorites
  'post /flashfav': 'FavoriteFlash.add',
  'get /flashfav': 'FavoriteFlash.consult',
  'delete /flashfav': 'FavoriteFlash.remove',

  // FreelancerFavs
  'post /freelancerfav': 'FavoriteFreelancer.add',
  'get /freelancerfav': 'FavoriteFreelancer.consult',
  'get /freelancerfav/count': 'FavoriteFreelancer.countFavorites',
  'delete /freelancerfav': 'FavoriteFreelancer.remove',

  // Freelancer
  'post /freelancer/rate': 'FreelancerController.rateFreelancer',
  'get /freelancer': 'FreelancerController.getAll',
  'get /freelancer/nearby': 'FreelancerController.getNearby',
  'get /freelancer/paid': 'FreelancerController.getPaid',

  // Itinerary
  'post /itinerary/add': 'ItineraryController.add',
  'get /itinerary/getAllAsFreelancer': 'ItineraryController.getAllAsFreelancer',
  'get /itinerary/getAllAsStudio': 'ItineraryController.getAllAsStudio',
  'get /itinerary/getAllAsClient': 'ItineraryController.getAllAsClient',
  'get /itinerary/getAllAsAdmin': 'ItineraryController.getAllAsAdmin',

  // PayPal
  'get /paypal': {
    view: 'pagopaypal'
  },
  'post /paypal': 'PaymentsController.paypal',
  'get /paypalexecute': 'PaymentsController.paypalExecute',
  'get /paypalcancel': 'PaymentsController.paypalCancel',
  'get /aceptplan': 'PaymentsController.paypalAceptPlan',
  'get /cancelplan': 'PaymentsController.paypalCancelPlan',

  // Studio Favs
  'post /studiofav': 'FavoriteStudio.add',
  'get /studiofav': 'FavoriteStudio.consult',
  'get /studiofav/count': 'FavoriteStudio.countFavorites',
  'delete /studiofav': 'FavoriteStudio.remove',

  // Quotation
  'post /quotation': 'QuotationController.quotation',
  'get /quotation/studio': 'QuotationController.findByStudio',
  'get /quotation/freelancer': 'QuotationController.findByFreelance',
  'get /quotation': 'QuotationController.find',

  // Studio
  'post /studio/rate': 'StudioController.rateStudio',
  'get /studio': 'StudioController.getAll',
  'get /studio/nearby': 'StudioController.getNearby',
  'get /studio/paid': 'StudioController.getPaid',
  'get /studio/getArtists/:id': 'StudioController.getArtists',

  // Styles
  'get /styles': 'StyleController.find',

  // Tattoo
  'post /tattoo': 'TattooController.add',
  'delete /tattoo': 'TattooController.deleteTattoo',
  'get /tattoo': 'TattooController.find',
  'get /tattoo/all': 'TattooController.all',
  'get /tattoo/get': 'TattooController.get',
  'put /tattoo/approve/:id': 'TattooController.approve',
  'put /tattoo/:id': 'TattooController.update',
  'get /tattoo/notApproved': 'TattooController.notApproved',
  'get /tattoo/studio/:id': 'TattooController.findByStudio',
  'get /tattoo/bodyParts': 'BodyPartController.find',

  // TattooFavorites
  'post /tattoofav': 'FavoriteTattoo.add',
  'get /tattoofav': 'FavoriteTattoo.consult',
  'get /tattoofav/count': 'FavoriteTattoo.countFavorites',
  'delete /tattoofav': 'FavoriteTattoo.remove',

  // User
  'post /logup': 'UserController.logup',
  'put /edit': 'UserController.edit',
  'post /login': 'UserController.login',
  'get /user/findBy': 'UserController.findBy',
  'get /user/get': 'UserController.get',
  'get /user/all': 'UserController.getAll',
  'get /user/getById': 'UserController.getById',
};
