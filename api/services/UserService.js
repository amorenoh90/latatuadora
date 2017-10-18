var constants = require('../Constants.js'),
  messages = constants.messages;

function getPropertyArray(array, property, subproperty) {
  var result = [];

  for (var i = 0; i < array.length; i++) {
    var element = array[i];

    if (element[property]) {
      if (subproperty) {
        element = element[property];
        if (element[subproperty]) result.push(element[subproperty]);
      } else {
        result.push(element[property]);
      }
    }
  }

  return result;
}

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
  },

  getAll: async function (options, done) {
    try {
      var values = options.input || {},
        result = {
          messages: [],
          json_response: {},
          errors: []
        },
        query = {
          userType: values.userType
        },
        freelancers = await
          FreelanceStyle
            .find({styleId: values.style})
            .populateAll(),
        studios = await
          StudioStyle
            .find({styleId: values.style})
            .populateAll();

      freelancers = getPropertyArray(freelancers, "freelanceId", "user"),
        studios = getPropertyArray(studios, "studioId", "userId");

      values.userType = values.userType || 6;
      values.userType = parseInt(values.userType);

      switch (values.userType) {
        case 6:
          delete query.userType;

          query.or = [
            {id: studios},
            {id: freelancers}
          ];

          if (!values.style) {
            query.or = [
              {userType: constants.userType.studio},
              {userType: constants.userType.freelance}];
          }
          break;

        default:
          if (query.userType == 3) {
            delete query.userType;

            query.or = [
              {id: studios}
            ];

            if (!values.style) {
              delete query.or;
              query.userType = constants.userType.studio;
            }
          }

          if (query.userType == 4) {
            delete query.userType;

            query.or = [
              {id: freelancers}
            ];

            if (!values.style) {
              delete query.or;
              query.userType = constants.userType.freelance;
            }
          }
          break;
      }

      var users = await
        User
          .find()
          .where(query)
          .sort('createdAt DESC');

      if (users.length < 1) result.messages.push(messages.NO_USERS_UNDER_CRITERIA);

      for (var i = 0; i < users.length; i++) {
        var user = users[i];

        user.studio = (await Studio
          .find({
            userId: user.id
          }))[0] || null,
          user.freelancer = (await Freelancer
            .find({
              user: user.id
            }))[0] || null;
      }

      result.json_response.users = users;

      return done(null, result.json_response.users);
    }
    catch (exception) {
      result.messages = [];
      result.errors.push(exception);

      return done(exception, result);
    }
  }
}
;
