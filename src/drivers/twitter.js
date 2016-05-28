import Twit from 'twit'
import { Observable as $ } from 'rx'

let makeEventsSelector = (T, stream) => (eventName) => {
  return $.fromEvent(stream, eventName)
}

let makeStreamSelector = (T) => (...params) => {
  let stream = T.stream(...params)

  return {
    events: makeEventsSelector(T, stream)
  }
}

export function makeTwitDriver (options) {
  let T = new Twit(options)

  return function twitDriver (sink) {
    return {
      stream: makeStreamSelector(T)
    }
  }
}
