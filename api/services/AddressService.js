module.exports = {
  add: function (values, done) {
    var newAddress = {
        street: values.street,
        numInt: values.numInt,
        numExt: values.numExt,
        lat: values.lat,
        long: values.long,
        zc: values.zc
      },
      newtown = {
        name: values.town
      },
      newsuburb = {
        name: values.suburb
      },
      newstate = {
        name: values.state
      };
    Town.findOrCreate(newtown).exec(function (err, town) {
      if (err) {
        return done(err);
      } else {
        newsuburb.townId = town.id;
        Suburb.findOrCreate(newsuburb).exec(function (err, suburb) {
          if (err) {
            return done(err);
          } else {
            newAddress.suburbId = suburb.id;
            State.findOrCreate(newstate).exec(function (err, state) {
              if (err) {
                return done(err);
              } else {
                newAddress.stateId = state.id;
                Address.create(newAddress).exec(function (err, address) {
                  if (err) {
                    return done(err);
                  } else {
                    done(null, address.id);
                  }
                });
              }
            });
          }
        });
      }
    });
  }
};
