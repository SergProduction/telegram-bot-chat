const models = require('../models')


const main = async () => {
  const countAllMess = await models.message.count()

  console.log(mess)
  console.log(countAll)

  const messInOnePart = 1000
  const countAllParts = countAllMess / messInOnePart

  for (let i=1; i <= countAllParts; i++) {
    const messages = await models.message.findAll({
      limit: messInOnePart,
      offset: i * messInOnePart,
    })
  }

  return true
}


main()
  .then(_ => models.sequelize.close())
  .then(_ => process.exit())