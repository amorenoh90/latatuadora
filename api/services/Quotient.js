module.exports = {
  calculate: function (quotation, done) {
    var results = {
            minAmount: '', 
            maxAmount: ''
        },
    area = quotation.dimensionsX * quotation.dimensionsY;

    if(area > 20) area = 20; //provicional

    Calculator.find({styleId: quotation.styleId}).exec(function (err, records){
      if (err) {
        done(err);
      }
      else{
        var minAmmount, maxAmmount;        
        if(records.length == 0){
          done(null,{message: "no data for your quotation"});
          return;
        }
        minAmmount = records[0].minAmount;
        maxAmmount = records[0].maxAmount;
        var sumin=0, sumax=0;
        for(i in records){
          if(minAmount > records[0].minAmount) {
              minAmmount = records[i].minAmount;
          } 
          if(maxAmount > records[0].maxAmount) {
              maxAmmount = records[i].maxAmount;
          }
        }
        results.minAmount = minAmmount;
        results.maxAmount = maxAmmount;
        done(null, results);                 
      }
    });    
  }
}



