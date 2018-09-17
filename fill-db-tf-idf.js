const models = require('./models')


const strintToWordsArr = (text) => text.replace(/[,.]/g, '').split(' ').filter(word => word !== '')

const countWords = new Map()

async function countingTFIDF(countDoc, countUsers) {
  for (let i = 0; i < count; i++) {
    try {
      const users = await models.User.findAll({
        offset: i * countUsers,
        limit: countUsers,
      })

      users.forEach(user => {
        strintToWordsArr(user.text).forEach(word => {
          const count = countWords.get(word)
          if (count === undefined) {
            countWords.set(word, 1)
          }
          else {
            countWords.set(word, count + 1)
          }
        })
      })
    }
    catch (error) {
      break
      throw error
    }
  }
}

async function fillDBTFIDF(params) {
  
}


// models.User.count().then(c => {})

/*
ff(1000, 3).then(() => {


    const topWord = Array.from(countWords.entries())
      .sort(([aWord, aCount], [bWord, bCount]) => bCount-aCount)
      .slice(0, 100)
  
    console.log(topWord)
    console.log(countWords.size)

})
*/


models.TFIDF.findOrCreate({ where: {id: 1}, defaults: { tf: 1.0, df: 1.0, tf_idf: 1.0 }})
  .then(res => {
    console.log(res)
  })