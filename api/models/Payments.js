module.exports = {
  attributes: {
    user: {
      model: 'user'
    },
    purchaseId: {
      type: 'string',
      unique: true
    },
    status: {
      model: 'paymentstatus'
    },
    itemType: {
      model: 'itemtype'
    },
    reference: {
      type: "integer"
    }
  }
};
