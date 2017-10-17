var constants = require('../Constants.js'),
  messages = constants.messages;
module.exports = {
  get: function (options, done) {
    var values = options.input || {};

    var doQuery = async () => {
      var user;
      try {
        user = (await User
          .find({
            email: values.email
          })
          .populateAll())[0],
          errors = null;

        if (!user) {
          user = messages.NO_SUCH_USER;
        } else {
          user.studio = (await Studio
            .find({
              userId: user.id
            })
            .populateAll())[0] || null,
            user.freelancer = (await Freelancer
              .find({
                user: user.id
              })
              .populateAll())[0] || null;

          if (user.studio || user.freelancer) {
            if (!user.studio) user.studio = {addressId: {id: 0}};
            if (!user.studio.addressId) {
              user.studio.addressId = {id: 0};
            }

            if (!user.freelancer) user.freelancer = {addressId: {id: 0}};
            if (!user.freelancer.addressId) {
              user.freelancer.addressId = {id: 0};
            }

            user.addressId = user.studio.addressId.id || user.freelancer.addressId.id;
            user.addressId = (await Address
              .find({
                id: user.addressId
              })
              .populateAll())[0] || null;
          }
        }
      } catch (error) {
        errors = error;
      } finally {
        done(errors, user);
      }
    };

    doQuery();
  },

  getById: function (options, done) {
    var values = options.input || {};

    var doQuery = async () => {
      var user;
      try {
        user = (await User
          .find({
            id: values.user
          })
          .populateAll())[0],
          errors = null;

        if (!user) {
          user = messages.NO_SUCH_USER;
        } else {
          user.studio = (await Studio
            .find({
              userId: user.id
            })
            .populateAll())[0] || null,
            user.freelancer = (await Freelancer
              .find({
                user: user.id
              })
              .populateAll())[0] || null;

          if (user.studio || user.freelancer) {
            if (!user.studio) user.studio = {addressId: {id: 0}};
            if (!user.studio.addressId) {
              user.studio.addressId = {id: 0};
            }

            if (!user.freelancer) user.freelancer = {addressId: {id: 0}};
            if (!user.freelancer.addressId) {
              user.freelancer.addressId = {id: 0};
            }

            user.addressId = user.studio.addressId.id || user.freelancer.addressId.id;
            user.addressId = (await Address
              .find({
                id: user.addressId
              })
              .populateAll())[0] || null;
          }
        }
      } catch (error) {
        errors = error;
      } finally {
        done(errors, user);
      }
    };

    doQuery();
  }
};
