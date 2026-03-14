const source = require('./sources/resultat.json')

const transformed = source.map(p => {
  const { id_mesure, id_specimen, id_analyse, valeur } = p
  return {
    id: parseInt(id_mesure, 10),
    specimenId: parseInt(id_specimen, 10),
    analysisId: parseInt(id_analyse, 10),
    value: valeur
  }
})

// console.debug('data-results', transformed.length)

module.exports = transformed


