module.exports = {
  userType: {
    admin: 1,
    user: 2,
    studio: 3,
    freelance: 4,
    quotient: 5
  },
  SECRET_TOKEN: 'latatuadoratokensecret',
  payment: {
    pending: 1,
    paid: 2,
    expired: 3,
    canceled: 4,
    undefined: 5
  },
  payPalUrls: {
    execute: 'http://localhost:1337/paypalexecute',
    cancel: 'http://localhost:1337/paypalcancel',
    aceptplan: 'http://localhost:1337/aceptplan',
    cancelplan: 'http://localhost:1337/cancelplan'
  },
  itemType: {
    1: "Flash",
    2: "StudioMembership",
    3: "FreelanceMembership",
    4: "LeadsCredits"
  },
  memberships: {
    studio: 1,
    freelancer: 2
  },
  membershipStatus: {
    active: 1,
    inactive: 2,
    locked: 3
  },
  studioStatus: {
    pending: 1,
    publicate: 2,
    block: 3,
  },
  lead_amount: [
    20,
    50,
    100,
  ],
  lead_price: [
    200,
    500,
    1000
  ],
  email: {
    quotation: {
      subject: "Haz recibido una nueva cotizacion",
      content: ""
    }
  },
  messages: {
    NO_SUCH_USER: "No existe tal usuario",
    NO_ITINERARIES: "No hay registros de itinerario",
    NO_USERS: "No hay registros de usuario",
    NO_USERS_UNDER_CRITERIA: "No hay registros de usuario bajo el criterio especificado",
    NO_FLASHES_UNDER_CRITERIA: "No hay registros de Flash bajo el criterio especificado",
    NO_TATTOOS_UNDER_CRITERIA: "No hay registros de Flash bajo el criterio especificado",
    ADDED_ITINERARY: "Se agregó el itinerario",
    ACCESS_FORBIDDEN: "You are not permitted to perform this action.",
    EMAIL_SENT: "El Email fue enviado exitosamente.",
    SUCCESS: "Éxito"
  }
};
