/**
 * Created by enriquelc on 9/05/17.
 */
var sails = require('sails');

const bodyparts = [
  {
    name: "Left Arm",
    section: 0,
    path: "a path"
  },
  {
    name: "Right Arm",
    section: 0,
    path: "a path"
  },
  {
    name: "Left leg",
    section: 0,
    path: "a path"
  },
  {
    name: "Right leg",
    section: 0,
    path: "a path"
  },
  {
    name: "Left hand",
    section: 0,
    path: "a path"
  },
  {
    name: "Right hand",
    section: 0,
    path: "a path"
  }];

before(function (done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(100000);

  sails.lift({
    // configuration for testing purposes
  }, function (err) {
    if (err) return done(err);

    var doQuery = async () => {
      var bodyparts_before_adding = await BodyPart.find().populateAll();
      if (bodyparts_before_adding.length < 6) await BodyPart.createEach(bodyparts);

      done(err, sails);
    };

    doQuery();
  });
});

after(function (done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
