module.exports = {
  attributes: {
    styleId: {
      model: 'Style'
    },
    bodypartId: {
      model: 'BodyPart'
    },
    minAmount: {
      type: 'float'
    },
    maxAmount: {
      type: 'float'
    },
    studioId: {
      model: 'Studio'
    },
    minRange: {
      type: "float"
    },
    maxRange: {
      type: "float"
    }
  },
  tableName: 'Calculator'
};

