module.exports = {
    attributes: {
        user: {
            model: 'user'
        },
        purchaseId: {
            type: 'string'
        },
        status: {
            model: 'paymentstatus'
        },
        itemType: {
            model: 'itemtype'
        },
        reference: {
            type: "string"
        }
    }
};