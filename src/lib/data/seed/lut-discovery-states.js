const source = require('./sources/lut_etat_decouverte.json')

const transformed = source.map(p => {
  const { id, etat } = p
  return {
    id: parseInt(id, 10),
    name: etat.trim().replaceAll("''", "'")
  }
})// .filter(p => p.id !== 0) // remove id = 0

module.exports = transformed
