module.exports = {
  find: function(req, res) {
    Style.find().then(function(results) {
      res.send(results);
    });
  }
};
