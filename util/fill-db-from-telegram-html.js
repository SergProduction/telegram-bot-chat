const fs = require('fs')
const path = require('path')

const models = require('../models')
const { htmlParse } = require('./telegram-html-parse')


const delay = time => new Promise(r => setTimeout(r, time))

const progressLog = (text) => {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(text)
}


const readFile = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, data) => {
    if (err) reject(err)
    resolve(data)
  })
})

const pathFolderTelegramHtml = '../telegram-html'

console.log('starting')

const htmlFiles = fs.readdirSync(path.join(__dirname, pathFolderTelegramHtml))
  .filter(fileOrDir => path.parse(fileOrDir).ext === '.html')

console.log('all html files count -', htmlFiles.length)


async function wtireBD(htmlFiles) {
  for(let i = 0; i < htmlFiles.length; i++) {
    const fileNameHtml = htmlFiles[i]
    
    const htmlBuf = await readFile(path.join(__dirname, pathFolderTelegramHtml, fileNameHtml))
    
    const htmlString = htmlBuf.toString()
    
    const messages = htmlParse(htmlString)
    
    progressLog(`file - ${i}. messages in this file - ${messages.length}`)

    try {
      await models.user.bulkCreate(messages, { hooks: false })
    } catch (err) {
      console.log(`/nerror in file ${i}. ${fileNameHtml}`)
      console.error(err)
    }
    
    await delay(10)
  }
}

wtireBD(htmlFiles)
  .then(_ => models.sequelize.close())
  .then(_ => {
    console.log('\nfinished')
    process.exit()
  })