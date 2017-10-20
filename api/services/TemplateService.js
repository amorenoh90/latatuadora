var ejs = require('ejs');
var fs = require('fs');

var retrieveContent = function (templateName, model) {
  var templateLocation = "views/mail/" + templateName;
  var fileContent = fs.readFileSync(templateLocation, "utf8");
  return ejs.render(fileContent, {
    filename: templateLocation,
    model: model
  });
};

module.exports = {
  retrieveContent: retrieveContent
};
