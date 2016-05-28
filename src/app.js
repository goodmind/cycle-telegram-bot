import { Observable as $ } from 'rx'

import { run } from '@cycle/core'
import { makeTelegramDriver, broadcast } from 'cycle-telegram'
import { makeTwitDriver } from './drivers/twitter'

import TwitterGateway from './components/twitter-gateway'
import config from './conf/config.json'

let main = ({T, bot}) => {
  let cycle = TwitterGateway({T, props: {
    from: '703180267033333760',
    to: '@cycle_js'
  }})

  return {
    bot: $.from([ cycle.bot ]),
    log: $.merge(cycle.log)
  }
}

run(main, {
  T: makeTwitDriver({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token: config.twitter.access_token,
    access_token_secret: config.twitter.access_token_secret
  }),
  
  bot: makeTelegramDriver(config.telegram.access_token),
  
  log: (m) => m.forEach(::console.log)
})