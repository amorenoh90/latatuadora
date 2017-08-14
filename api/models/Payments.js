module.exports = {
  attributes: {
    user: {
      model: 'User'
    },
    purchaseId: {
      type: 'string',
      unique: true
    },
    status: {
      model: 'PaymentStatus'
    },
    itemType: {
      model: 'ItemType'
    },
    reference: {
      type: "integer"
    }
  },
  tableName: 'Payments'
};
