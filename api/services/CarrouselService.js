function getByStudio(values, done) {
  var studio = values.studio || 0,
    error = null;
  var doQuery = async () => {
    try {
      var carrousel = await Carrousel.find({studio: studio});
    } catch (exception) {
      error = exception;
    } finally {
      done(error, carrousel);
    }
  };

  doQuery();
}

module.exports = {
  getByStudio: getByStudio
};
