const source = require('./sources/decouvreur.json')

const { stringOrNull, stringToBool } = require('./utils')

// "id_evenement": 1004,
// "salutation": null,
// "nom": null,
// "prenom": null,
// "id_adresse": 50399,
// "no_civique": null,
// "route": null,
// "courriel": null,
// "appartement": null,
// "id_muni": null,
// "municipalite": null,
// "province": null,
// "code_postal": null,
// "telephone": null

const transformed = source.map(p => {
  const { 
    id_evenement,

    salutation,
    nom,
    prenom,

    courriel,
    telephone,

    no_civique,
    route,
    appartement,

    id_muni,
    municipalite,
    province,
    code_postal,

    id_adresse
  } = p

  const localityId = parseInt(id_muni, 10)

  return {
    eventId: parseInt(id_evenement, 10),

    greeting: stringOrNull(salutation),
    lastName: stringOrNull(nom),
    firstName: stringOrNull(prenom),

    email: stringOrNull(courriel),
    telephone: stringOrNull(telephone),

    streetNumber: stringOrNull(no_civique),
    street: stringOrNull(route),
    apt: stringOrNull(appartement),

    localityId,
    localityName: stringOrNull(municipalite),
    province: stringOrNull(province),
    postalCode: stringOrNull(code_postal),

    legacyAddressId: parseInt(id_adresse, 10)
  }
})

module.exports = transformed

// "id_evenement": 1004,
// "salutation": null,
// "nom": null,
// "prenom": null,
// "id_adresse": 50399,
// "no_civique": null,
// "route": null,
// "courriel": null,
// "appartement": null,
// "id_muni": null,
// "municipalite": null,
// "province": null,
// "code_postal": null,
// "telephone": null