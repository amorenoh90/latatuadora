var constants = require('../Constants');

module.exports = {
    find: function (values, done) {
        var collection = constants.itemType[values.itemType];
        switch(collection){
            case 'Flash':
                Flash.findOne({ id: values.itemId }).exec(function (err, item){
                  if (err) {
                    return done(err);
                  }
                  if (!item) {
                    return done({message: 'Could not find item, sorry.'});
                  }
                  else{
                    if(item.sell == true){
                        return done({message: 'Impossible to buy this item'});
                    }
                    else{
                        item.id = "flash-" + item.id;
                        return done(null, item);
                    }
                  }
                });
                break;
            default:
                
        }
    },
    update: function (values, done) {
        var collection = constants.itemType[values.itemType];
        switch(collection){
            case 'Flash':
                Flash.update({id: values.itemId},{sell: true}).exec(function afterwards(err, updated){
                  if (err) {
                    return done(err);
                  }
                  else{
                    return done(null, updated);
                  }
                });
        }
    }
}