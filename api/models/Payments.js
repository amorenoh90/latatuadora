module.exports = {
    attributes: {
        userId: {
            model: 'user'
        },
        token: {
            type: 'string'
        },
        statusId: {
            model: 'paymentstatus'
        },
        itemTypeId: {
            model: 'itemtype'
        },
        referenceId: {
            type: "string"
        }
    }
};