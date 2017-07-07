module.exports = {
    userType:{
        admin: 1,
        user: 2,
        studio: 3,
        freelance: 4,
        quotient: 5
    },
    SECRET_TOKEN : 'latatuadoratokensecret',
    payment:{
        pending: 1,
        paid: 2,
        expired: 3,
        canceled:4,
        undefined: 5
    },
    payPalUrls:{
        execute: 'http://localhost:1337/paypalexecute',
        cancel: 'http://localhost:1337/paypalcancel',
        aceptplan: 'http://localhost:1337/aceptplan',
        cancelplan: 'http://localhost:1337/cancelplan'
    },
    itemType:{
        1: "Flash",
        2: "StudioMembership", 
        3: "FreelanceMembership",
        4: "Leads"
    },
    memberships:{
        studio: 1,
        freelancer: 2
    },
    membershipStatus:{
        active: 1,
        inactive: 2,
        locked: 3
    }
};  