const source = require('./sources/specimen_mesure.batch_1.json')

const transformed = source.map(p => {
  const { id_mesure, id_specimen, id_type_mesure, valeur, id_unite } = p
  return {
    id: parseInt(id_mesure, 10),
    specimenId: parseInt(id_specimen, 10),
    measureTypeId: parseInt(id_type_mesure, 10),
    value: valeur,
    unitId: parseInt(id_unite, 10)
  }
})

console.debug('data-specimen-measures', transformed.length)

module.exports = transformed


