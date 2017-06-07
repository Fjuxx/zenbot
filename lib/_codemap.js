module.exports = {
  _ns: 'zenbot',
  _folder: 'lib',

  'ema': require('./ema'),
  'ema_ta': require('./ema_ta'),
  'macd' : require('./macd.js'),
  'engine': require('./engine'),
  'normalize-selector': require('./normalize-selector'),
  'rsi': require('./rsi'),
  'stddev': require('./stddev')
}