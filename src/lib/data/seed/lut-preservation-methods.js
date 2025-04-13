const source = require('./sources/lut_methode_conservation.json')

const transformed = source.map(p => {
  const { id, methode, id_cccsf, nom_cccsf, description } = p
  return {
    id: parseInt(id, 10),
    name: methode.trim().length === 0 ? null : methode.trim().replaceAll("''", "'"),
    description,
    cccsfId: parseInt(id_cccsf, 10),
    cccsfName: nom_cccsf.trim()
  }
})

module.exports = transformed
