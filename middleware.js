const KrakenClient = require('kraken-api')
require('dotenv').config()

//KrakenAPI notifier
const krakenKey = process.env.KRAKEN_API
const krakenSecret = process.env.KRAKEN_SECRET

const kraken  = new KrakenClient(krakenKey, krakenSecret);


async function callKraken() {
    let currentValueArray = await kraken.publicMethod('Ticker?pair=XXLMZEUR')
    let balance = await kraken.api('Balance')

    var myMoney = balance['result']['XXLM']
    var tmp = currentValueArray['result']['XXLMZEUR']['c']
    var currentValue = tmp[0]

    totalMoney = myMoney * currentValue

    return {totalMoney, myMoney, currentValue}
}

module.exports = {
    callKraken
}