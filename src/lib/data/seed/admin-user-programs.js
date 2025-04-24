const source = require('./sources/admin_x_utilisateur_programme.json')

const { stringToBool } = require('./utils')

const rolesByLegacyId = {
  1: 'soumissionnaire',
  100: 'gestion',
  101: 'laboratoire',
  102: 'consultation'
}

const transformed = source.map(p => {
  const { id_utilisateur, id_programme, id_role, peut_soumettre } = p
  return {
    userId: id_utilisateur.trim(),
    programId: parseInt(id_programme, 10),
    roleId: parseInt(id_role, 10) === 0 ? null : rolesByLegacyId[parseInt(id_role, 10)],
    canSubmit: stringToBool(peut_soumettre)
  }
})

module.exports = transformed
