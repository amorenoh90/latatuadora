module.exports.routes = {
  '/': {
    view: 'homepage'
  },
  //>Routes Quotation
  'post /quotation': 'QuotationController.quotation',
  'get /quotation/studio': 'QuotationController.findByStudio',
  'get /quotation': 'QuotationController.find',
  //<Routes Quotation

  //>User login
  'post /logup': 'UserController.logup',
  'put /edit': 'UserController.edit',
  'post /login': 'UserController.login',
  'get /user/findBy': 'UserController.findBy',
  'get /user/get': 'UserController.get',
  //<User login

  //>Tattoo Routes
  'post /tattoo': 'TattooController.add',
  'get /tattoo': 'TattooController.find',
  'put /tattoo/approve/:id': 'TattooController.approve',
  'put /tattoo/:id': 'TattooController.update',
  'get /tattoo/notApproved': 'TattooController.notApproved',
  'get /tattoo/studio/:id': 'TattooController.findByStudio',
  'get /tattoo/bodyParts': 'BodyPartController.find',
  //<Tattoo Routes

  //>TattooFavorites
  'post /tattoofav': 'FavoriteTattoo.add',
  'get /tattoofav': 'FavoriteTattoo.consult',
  'get /tattoofav/count': 'FavoriteTattoo.countFavorites',
  'delete /tattoofav': 'FavoriteTattoo.remove',
  //<TattooFavorites

  //>Email Routes
  'post /email': 'EmailController.send',

  //>Flash Routes
  'post /flash': 'FlashController.add',
  'get /flash': 'FlashController.find',
  'get /flash/filter': 'FlashController.getAll',
  'get /flash/sold': 'FlashController.getSold',
  'get /flash/studio/:id': 'FlashController.findByStudio',
  'put /flash/approve/:id': 'FlashController.approve',
  'put /flash': 'FlashController.update',
  'get /flash/notApproved': 'FlashController.notApproved',
  'delete /flash': 'FlashController.delete',
  'post /flash/publish': 'FlashController.publish',
  //<Flash Routes

  //>FlashFavorites
  'post /flashfav': 'FavoriteFlash.add',
  'get /flashfav': 'FavoriteFlash.consult',
  'delete /flashfav': 'FavoriteFlash.remove',
  //<FlashFavorites

  //>Favs
  'get /favs': 'UserController.favs',
  //<Favs

  //Routes Conekta
  'get /conekta': {
    view: 'pagoconekta'
  },
  'post /conekta': 'PaymentsController.conekta',
  //<Routes Conekta

  //Routes PayPal
  'get /paypal': {
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
  'post /artist/rate': 'ArtistController.rateArtist',
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
  'get /address/states': 'AddressController.states',
  'get /address/suburbs': 'AddressController.suburbs',
  'get /address/towns': 'AddressController.towns',
  //<address

  //>styles
  'get /styles': 'StyleController.find',
  //<style

  //>Studio
  'post /studio/rate': 'StudioController.rateStudio',
  'get /studio': 'StudioController.getAll',
  'get /studio/nearby': 'StudioController.getNearby',
  'get /studio/paid': 'StudioController.getPaid',
  //<Studio

  //>Freelancer
  'post /freelancer/rate': 'FreelancerController.rateFreelancer',
  'get /freelancer': 'FreelancerController.getAll',
  'get /freelancer/nearby': 'FreelancerController.getNearby',
  'get /freelancer/paid': 'FreelancerController.getPaid',
  //<Freelancer

  // Itinerary
  'post /itinerary/add': 'ItineraryController.add',
  'get /itinerary/getAllAsFreelancer': 'ItineraryController.getAllAsFreelancer',
  'get /itinerary/getAllAsStudio': 'ItineraryController.getAllAsStudio',
  'get /itinerary/getAllAsClient': 'ItineraryController.getAllAsClient',
  'get /itinerary/getAllAsAdmin': 'ItineraryController.getAllAsAdmin'
};
