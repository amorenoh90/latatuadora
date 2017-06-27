module.exports = {
    attributes: {
        user: {
            model: 'user'
        },
        token: {
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