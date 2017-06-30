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
        undefined: 4
    },
    payPalUrls:{
        execute: 'http://localhost:1337/paypalexecute',
        cancel: 'http://localhost:1337/paypalcancel',
        aceptplan: 'http://localhost/aceptplan',
        cancelplan: 'http://localhost/cancelplan'
    },
    itemType:{
        1: "Flash",
        2: "Lead",
        3: "StudioMembership", 
        4: "FreelanceMembership"
    },
    memberships:{
        studio: 1,
        freelancer: 2
    }
};  