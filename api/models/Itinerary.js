module.exports = {
  identity: 'Itinerary',
  attributes: {
    jobber: {
      model: 'User'
    },
    client: {
      model: 'User'
    },
    datetime: {
      type: "datetime"
    },
    comment: {
      type: "string"
    }
  }
};
