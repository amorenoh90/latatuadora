var jwt = require('jwt-simple');
var moment = require('moment');
var constants = require('../Constants');
module.exports = {
    createToken: function (user, done) {
        const payload = {   
            sub: user.id,
            typ: user.userType,
            iat: moment().unix(),
            exp: moment().add(7, 'days').unix()
        }

        return jwt.encode(payload, constants.SECRET_TOKEN);
    }
}