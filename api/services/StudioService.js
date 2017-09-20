module.exports = {
  update: function (req, res) {
    var values = req.body;
    if (req.file) {
      values.file = req.file;
    }

    var update_data = {},
      names = ["name", "certCofepris", "addressId", "titleImgUrl", "logoUrl", "about", "status", "membership", "websiteUrl", "fbUrl", "twUrl", "insUrl"]

    for (var name in names) {
      if (values.property) {
        update_data.property = values.property;
      }
    }

    Studio.update({
      id: values.id
    }, update_data).exec(function afterwards(err, updated) {
      if (err) {
        return res.negotiate(err);
      } else {
        return res.send(updated);
      }
    });
  },
};
