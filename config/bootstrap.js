global.constants = require('../api/Constants');

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

module.exports.bootstrap = function (cb) {

  var doQuery = async () => {
    await BodyPart.createEach(bodyparts);

    cb();
  };

  doQuery();
};
