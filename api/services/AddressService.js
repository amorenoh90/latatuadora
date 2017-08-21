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
    State.findOrCreate(newstate).then(function (state) {
      newsuburb.stateId = state.id;
      Suburb.findOrCreate(newsuburb).then(function (suburb) {
        Town.findOrCreate(newtown).then(function (town) {
          newAddress.stateId = state.id;
          newAddress.suburbId = suburb.id;
          newAddress.townId = town.id;
          Address.create(newAddress).then(function (address) {
            done(null, address.id);
          });
        });
      });
    }).catch(function (err) {
      if (err) return done(err);
    });
  }
};
