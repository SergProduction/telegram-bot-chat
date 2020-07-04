const tfidf = require("tiny-tfidf-node")
const models = require('../models')
const { progressLog } = require('../util/progress-log')
const { compute_tfidf, compute_tf } = require('../util/tf-idf')
const { textDocumentToArrWords } = require('../util/document-normalize')



const main = async () => {

  const corpus = await models.message.findAll({
    limit: 1000,
    offset: 100000,
  })

  const corpus_normalized = corpus.map(m => textDocumentToArrWords(m.text))
  
  const res = compute_tfidf(corpus_normalized, progressLog)

  console.log(res)

  return 0
}


main()
  // .then(cwobj => Object.entries(cwobj).sort((a,b) => b[1] - a[1]))
  // .then(cw => writeFile('./count-words.json', JSON.stringify(cw, null, 2)))
  .then(_ => models.sequelize.close())
  .then(_ => {
    console.log('\nfinished.')
    process.exit()
  })
