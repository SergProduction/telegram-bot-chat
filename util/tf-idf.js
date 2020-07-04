const { collectionCount } = require('./lib')
// document - одно сообщение
// corpus - несколько document 


/**
 * TF термина а = (Количество раз, когда термин а встретился в тексте / количество всех слов в тексте)
 * @param {string[]} document 
 * @return {Map<string, number>}
 */
const compute_tf = (document) => {
  const wordsCounterMap = collectionCount(document)

  for (var [key, value] of wordsCounterMap) {
    wordsCounterMap.set(key, value / wordsCounterMap.size)
  }

  return wordsCounterMap
}


/**
 * IDF термина а = логарифм(Общее количество документов / Количество документов,
  в которых встречается термин а)
 * @param {string} word 
 * @param {string[][]} corpus 
 * @return {number}
 */
const compute_idf = (word, corpus) => {
  const corpusWithDocInContentsWord = corpus.filter(
    doc => doc.filter(
      wordDoc => wordDoc === word
    ).length > 0
  )

  return Math.log10(corpus.length / corpusWithDocInContentsWord.length )
}

/**
 * TF-IDF термина а = (TF термина а) * (IDF термина а)
 * @param {string[][]} corpus 
 * @param {?CallableFunction} progressCallback
 * @return {Map<string, number>[]}
 */
const compute_tfidf = (corpus, progressCallback) => {
  const corpus_tfidf = []

  for (let doc_i=0; doc_i<corpus.length; doc_i++) {
    const doc = corpus[doc_i]
    const doc_tf = compute_tf(doc)

    const doc_tfidf = new Map()

    for (let word_i=0; word_i<doc.length; word_i++) {
      const word = doc[word_i]
      const word_tf = doc_tf.get(word)
      const word_tfidf = word_tf * compute_idf(word, corpus)
      doc_tfidf.set(word, word_tfidf)

      // __debugg__
      if (progressCallback) { 
        progressCallback(
          doc_i / (corpus.length / 100), 
          // word_i / (doc.length / 100), 
        )
      }
    }

    corpus_tfidf.push(doc_tfidf)
  }

  return corpus_tfidf
}

/* future
const cosineSimilarity = (vector1, vector2) => {
  const v1 = Array.from(vector1.values());
  const v2 = Array.from(vector2.values());
  let dotProduct = 0.0;
  let ss1 = 0.0;
  let ss2 = 0.0;
  const length = Math.min(v1.length, v2.length);
  for (let i = 0; i < length; i++) {
    // Ignore pairs that will not affect either the dot product or the magnitude
    if (v1[i] === 0 && v2[i] === 0) continue;
    dotProduct += v1[i] * v2[i];
    ss1 += v1[i] * v1[i];
    ss2 += v2[i] * v2[i];
  }
  const magnitude = Math.sqrt(ss1) * Math.sqrt(ss2);
  return magnitude ? dotProduct / magnitude : 0.0;
}

const calculateDistanceMatrix = (corpusVectors) => {
  const identifiers = this._corpus.getDocumentIdentifiers();
  const vectors = identifiers.map(d => this._corpus.getDocumentVector(d));
  const matrix = new Array(vectors.length).fill(null).map(() => new Array(vectors.length));
  for (let i = 0; i < vectors.length; i++) {
    for (let j = i; j < vectors.length; j++) {
      if (i === j) {
        // A document is identical to itself
        matrix[i][j] = 0.0;
      } else {
        matrix[i][j] = 1.0 - Similarity.cosineSimilarity(vectors[i], vectors[j]);
        matrix[j][i] = matrix[i][j]; // the matrix is symmetric
      }
    }
  }
  this._distanceMatrix = { identifiers, matrix };
}
*/

module.exports = {
  compute_tf,
  compute_idf,
  compute_tfidf,
}