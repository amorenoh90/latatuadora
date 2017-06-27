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
        success: 2,
        expired: 3,
        undefined: 4
    },
    payPalUrls:{
        execute: 'http://localhost:1337/paypalexecute',
        cancel: 'http://localhost:1337/paypalcancel',
        aceptplan: 'http://localhost/aceptplan',
        cancelplan: 'http://localhost/cancelplan'
    }
};  