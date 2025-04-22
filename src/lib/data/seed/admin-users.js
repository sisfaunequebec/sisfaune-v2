const aspnetMembership = require('./sources/aspnet_membership.json')
const aspnetUsers = require('./sources/aspnet_users.json')
const users = require('./sources/utilisateur.json')

const { stringOrNull, stringToBool, dateOrNull } = require('./utils')

aspnetMembershipById = aspnetMembership.reduce((acc, m) => {
  const { UserId: id, LoweredEmail: email } = m
  acc[id] = {
    email
  }
  return acc
}, {})

aspnetUsersyId = aspnetUsers.reduce((acc, m) => {
  const { UserId: id, LoweredUserName: username } = m
  acc[id] = {
    username
  }
  return acc
}, {})

const transformed = users.map(p => {
  const { 
    id_utilisateur: id,
    nom,
    prenom,
    titre,
    organisation,
    division,
    service,
    no_civique,
    route,
    appartement,
    municipalite,
    province,
    code_postal,
    telephone,
    poste,
    cellulaire,
    telecopieur,
    est_pathologiste
   } = p

   const aspnetUser = aspnetUsersyId[id]
   const { username } = aspnetUser

   const aspnetMembership = aspnetMembershipById[id]
   const { email } = aspnetMembership

  return {
    id,
    username: stringOrNull(username),
    password: stringOrNull(username),

    firstName: stringOrNull(prenom),
    lastName: stringOrNull(nom),

    title: stringOrNull(titre),
    organisation: stringOrNull(organisation),
    division: stringOrNull(division),
    service: stringOrNull(service),

    email: stringOrNull(email),
    // emailVerified

    streetNumber: stringOrNull(no_civique),
    street: stringOrNull(route),
    apt: stringOrNull(appartement),

    localityName: stringOrNull(municipalite),
    province: stringOrNull(province),
    postalCode: stringOrNull(code_postal),

    telephone: stringOrNull(telephone),
    extension: stringOrNull(poste),
    mobile: stringOrNull(cellulaire),
    fax: stringOrNull(telecopieur),

    isPathologist: stringToBool(est_pathologiste)

    // userId: id_utilisateur.trim(),
    // programId: parseInt(id_programme, 10),
    // roleId: rolesByLegacyId[parseInt(id_role, 10)],
    // canSubmit: stringToBool(peut_soumettre)
  }
})

module.exports = transformed
