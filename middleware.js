const KrakenClient = require('kraken-api')
require('dotenv').config()

//KrakenAPI notifier
const krakenKey = process.env.KRAKEN_API
const krakenSecret = process.env.KRAKEN_SECRET

const kraken  = new KrakenClient(krakenKey, krakenSecret);

//pair eg: XXLMZEUR
//Main currency is the Crypto currency
//Refer combination https://api.kraken.com/0/public/AssetPairs

async function callKraken(pair, mainCurrency) {
    console.log('Calling Kraken API')
    let currentValueArray = await kraken.publicMethod('Ticker?pair='+pair)
    let balance = await kraken.api('Balance')

    var myMoney = balance['result'][''+mainCurrency]
    var tmp = currentValueArray['result'][''+pair]['c']
    var currentValue = tmp[0]

    totalMoney = myMoney * currentValue

    return {totalMoney, myMoney, currentValue}
}

module.exports = {
    callKraken
}