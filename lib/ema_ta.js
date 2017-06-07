var talib = require('talib')

module.exports = function container (get, set, clear) {
  return function ema_ta (s, key, length, source_key) {
    //create object for talib. only close is used for now but rest might come in handy
    var marketData = { open: [], close: [], high: [], low: [], volume: [] };
    //dont calculate until we have enough data
    if (s.lookback.length >= length) {
      //fillup marketData for talib.
      //this might need improvment for performance.
      for (var i = 0; i < length; i++) {
        marketData.close.push(s.lookback[i].close);
      }
      //doublecheck length.
      if (marketData.close.length >= length) {
        talib.execute({
          name: "EMA",
          startIdx: 0,
          endIdx: length -1,
          inReal: marketData.close,
          optInTimePeriod: length
        }, function (err, result) {
          if (err) {
            console.log(err);
            return;
          }
          //Result format: (note: outReal can have multiple items in the array)
          // { 
          //   begIndex: 8,
          //   nbElement: 1,
          //   result: { outReal: [ 1820.8621111111108 ] } 
          // }
          s.period[key] = result.result.outReal[(result.nbElement - 1)];
        });
      }
    }
  }
}