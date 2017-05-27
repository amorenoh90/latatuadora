
var jwt = require('jwt-simple');
var moment = require('moment');
var SECRET_TOKEN = 'latatuadoratokensecret';
module.exports = {
	createToken: function (user, done) {
		const payload = {
			sub: user.id,
			iat: moment().unix(),
			exp: moment().add(7, 'days').unix()
		}

		return jwt.encode(payload, SECRET_TOKEN);
	}
}