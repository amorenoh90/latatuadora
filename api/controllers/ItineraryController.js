module.exports = {
  add: function (req, res) {
    ControllerService.doOperation({
      req: req,
      res: res,
      operation: ItineraryService.add
    });
  }
};
