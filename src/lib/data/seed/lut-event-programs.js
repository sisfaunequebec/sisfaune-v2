const source = require('./sources/lut_evenement_programme.json')

// console.debug('lut_evenement_programme')

const transformed = source.map(p => {
  const { id, code, programme, actif } = p
  return {
    id,
    name: programme.trim().replaceAll("''", "'"),
    code,
    isActive: actif === '1'
  }
})

module.exports = transformed
