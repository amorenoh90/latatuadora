function purchaseCredits(values, done) {
  var input = values.input || {},
    result = {
      messages: [],
      json_response: {},
      errors: []
    };

  var doQuery = async (cb) => {
      try {
        var user = await
          User
            .find({
              id: input.user
            });

        if (user.length < 1) {
          result.messages.push(constants.messages.NO_SUCH_USER);
        } else {
          user = user[0];
          user.lead_credits += constants.lead_amount[input.lead_amount];

          user = await User
            .update({
              id: user.id
            }, {
              lead_credits: user.lead_credits
            });

          result.json_response.user = user;
        }
      } catch (error) {
        result.messages = [];
        result.errors.push(error);
      } finally {
        cb(result.errors.pop(), result);
      }
    }
  ;

  doQuery(done);
}

module.exports = {
  purchaseCredits: purchaseCredits
};
