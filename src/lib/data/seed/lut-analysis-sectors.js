const source = require('./sources/lut_secteur_analyse.json')

const transformed = source.map(p => {
  const { id, nom } = p
  return {
    id: parseInt(id, 10),
    name: nom.trim().replaceAll("''", "'")
  }
})

module.exports = transformed
