const source = require('./sources/lut_evenement_statut.json')

const transformed = source.map(p => {
  const { id, statut, code_mapaq } = p
  return {
    id: parseInt(id, 10),
    name: statut.trim(),
    mapaqCode: code_mapaq
  }
})

module.exports = transformed
