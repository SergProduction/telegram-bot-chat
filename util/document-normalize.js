const textDocumentToArrWords = (text) => text
  .replace(/[,.]/g, '')
  .split(' ')
  .filter(word => word !== '')
  .map(word => word.toLowerCase())

module.exports = {
  textDocumentToArrWords
}