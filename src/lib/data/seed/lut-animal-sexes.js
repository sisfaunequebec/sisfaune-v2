const source = require('./sources/lut_animal_sexe.json')

const transformed = source.map(p => {
  const { id, sexe } = p
  return {
    id: parseInt(id, 10),
    name: sexe.replaceAll("''", "'")
  }
}).filter(p => p.id !== 0) // remove id = 0

module.exports = transformed
