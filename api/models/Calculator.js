module.exports = {
  attributes: {
    styleId: {
      model: 'style'
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
      model: 'studio'
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

