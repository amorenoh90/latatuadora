module.exports = {
  calculate: function (quotation, done) {
    var results = {
            minAmount: '', 
            maxAmount: ''
        },
        area = quotation.dimensionsX * quotation.dimensionsY;

    Calculator.find({styleId: quotation.styleId, minRange:{'<=': area}, maxRange:{'>=': area} }).exec(function (err, records){
      if (err) {
        done(err);
      }
      else{
        if(records.length>1){
          var sumin=0, sumax=0;
          for(i in records){
            sumin = sumin + records[i].minAmount;
            sumax = sumax + records[i].maxAmount;
          }
          var minprom = sumin/records.length;
          var maxprom = sumax/records.length;
          if(minprom>maxprom){
            results.minAmount = maxprom;
            results.maxAmount = minprom;
          }
          else{
            results.minAmount = maxprom;
            results.maxAmount = minprom;
          }
          done(null, results);
        }
        if(records.length == 1){
          results.minAmount = records[0].minAmount;
          results.maxAmount = records[0].maxAmount;
          done(null, results);
        }
        if(records.length == 0){
          done(null,"no data for your quotation");
        }
      }
    });    
  }
}



