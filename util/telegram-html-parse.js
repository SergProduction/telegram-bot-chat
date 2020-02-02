const cheerio = require('cheerio')

/*
type Message = {
  message_id: Number,
  name: String,
  text: String,
  reply: Number | null, // message_id
  date: Date,
}

htmlParse :: html -> Message
*/
const htmlParse = (html) => {
  const $ = cheerio.load(html)

  const messages = Array.from($('.history').children()).reduce((acc, el) => {
    const message = {}

    const message_id = $(el).attr('id')

    if (message_id === undefined) return acc

    message.message_id = parseInt(message_id.replace('message', ''), 10)

    const isDay = message_id.indexOf('-')

    if (isDay !== -1) {
      message.day = $(el).text().trim() || null
    }
    else {
      message.day = null
    }

    const body = $(el).children('.body')

    message.name = $(body).find('.from_name').text().trim() || null

    message.text = $(body).find('.text').text().trim() || null

    message.time = $(body).find('.date').text().trim() || null

    const reply = $(body).find('.reply_to').find('a').attr('href') || null

    if (reply !== null) {
      const replyIdStr = reply.replace(/.*go_to_message(\d+)/, (match, replyId) => {
        return replyId
      })

      if (replyIdStr !== '') {
        message.reply = parseInt(replyIdStr, 10)
      }
    }
    else {
      message.reply = null
    }

    acc.push(message)

    return acc
  }, [])

  let day = null

  let name = null

  const messagesFullInfo = messages.map(m => {
    if (m.day !== null) day = m.day
    else m.day = day

    if (m.name !== null) name = m.name
    else m.name = name

    m.date = new Date(`${m.day} ${m.time}`)

    delete m.day
    delete m.time

    return m
  })

  const messagesText = messagesFullInfo.filter(m => m.text !== null)

  return messagesText
}

module.exports = { htmlParse }