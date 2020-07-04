
const collectionCount = arr => arr.reduce((map, item) => (
    map.has(item)
      ? map.set(item, map.get(item) + 1)
      : map.set(item, 1)
  ), new Map())



module.exports = {
  collectionCount
}