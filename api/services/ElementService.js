function getAll(values, done) {
  var error = null;

  var doQuery = async () => {
    try {
      var elements = await Element.find().populateAll();
    } catch (err) {
      error = err;
    } finally {
      done(error, elements);
    }
  };

  doQuery();
}

module.exports = {
  getAll: getAll
};
