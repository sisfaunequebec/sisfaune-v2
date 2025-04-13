const source = require('./sources/lut_animal_famille.json')

const transformed = source.map(p => {
  const { id_famille, famille } = p
  return {
    id: parseInt(id_famille, 10),
    name: famille.trim()
  }
})

module.exports = transformed
