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
        var minAmount, maxAmount;        
        if(records.length == 0){
          done(null,{message: "no data for your quotation"});
          return;
        }
        minAmount = records[0].minAmount;
        maxAmount = records[0].maxAmount;
        var sumin=0, sumax=0;
        for(i in records){
          if(minAmount > records[0].minAmount) {
              minAmount = records[i].minAmount;
          } 
          if(maxAmount > records[0].maxAmount) {
              maxAmount = records[i].maxAmount;
          }
        }
        results.minAmount = minAmount;
        results.maxAmount = maxAmount;
        done(null, results);                 
      }
    });    
  }
}



