module.exports = {
  /*
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
    */
  add: function (values, done) {
    var err;
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

    var doQuery = async () => {
      try {
        var state = await State.findOrCreate(newstate);

        newsuburb.stateId = state.id;

        var suburb = await Suburb.findOrCreate(newsuburb);
        var town = await Town.findOrCreate(newtown);

        newAddress.stateId = state.id;
        newAddress.suburbId = suburb.id;
        newAddress.townId = town.id;

        var address = await Address.create(newAddress);
      }
      catch (e) {
        console.log(e);
        err = e;
      }
      finally {
        done(err, address.id);
      }
    };

    doQuery();
  }
};
