const fs = require('fs')
const util = require('util')
const models = require('../models')
const { progressLog } = require('../util/progress-log')


const writeFile = util.promisify(fs.writeFile)


const strintToWordsArr = (text) => text.replace(/[,.]/g, '').split(' ').filter(word => word !== '')


const getCountWords = async () => {
  const countWords = Object.create(null)

  const countAllMess = await models.message.count()

  
  const messInOnePart = 1000
  const countAllParts = countAllMess / messInOnePart

  console.log({ countAllMess, countAllParts })

  for (let i=1; i <= countAllParts; i++) {
    progressLog(`${i} part in process`)

    const messages = await models.message.findAll({
      limit: messInOnePart,
      offset: i * messInOnePart,
    })

    messages.forEach(mess => {
      strintToWordsArr(mess.text).forEach(word => {
        const w = word.toLowerCase()
        const cw = countWords[w]
        countWords[w] = cw === undefined
          ? 1
          : cw + 1
      })      
    })

  }

  return countWords
}


getCountWords()
  .then(cwobj => Object.entries(cwobj).sort((a,b) => b[1] - a[1]))
  .then(cw => writeFile('./count-words.json', JSON.stringify(cw, null, 2)))
  .then(_ => models.sequelize.close())
  .then(_ => {
    console.log('\nfinished. file count-words.json created')
    process.exit()
  })