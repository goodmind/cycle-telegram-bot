import { broadcast } from 'cycle-telegram'

function TwitterGateway ({T, props}) {
  let tweets = T
    .stream('statuses/filter', { follow: props.from })
    .events('tweet')

  let sign = (tweet) =>
    props.sign ? `\nvia twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}` : ''

  return {
    bot: tweets.map(tweet => broadcast({
      chat_id: props.to,
      text: tweet.text + sign(tweet)
    })(tweet)),

    log: tweets
  }
}

export default TwitterGateway
