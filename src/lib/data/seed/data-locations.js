const source = require('./sources/localisation.json')

const { stringOrNull, parseIntegerOrNull } = require('./utils')

const transformed = source.map(p => {
  const { 
    id_evenement,
    id_type,
    description,

    latitude,
    longitude,

    no_civique,
    route,
    appartement,
    intersection,

    id_muni,
    municipalite,
    province,
    code_postal
  } = p

  const typeId = id_type.trim() === '1' ? 'adresse' : 'coordonnees'
  const localityId = parseIntegerOrNull(id_muni)

  return {
    eventId: parseIntegerOrNull(id_evenement),
    typeId: typeId,
    description: stringOrNull(description),

    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),

    streetNumber: stringOrNull(no_civique),
    street: stringOrNull(route),
    apt: stringOrNull(appartement),
    intersection: stringOrNull(intersection),

    localityId,
    localityName: stringOrNull(municipalite),
    province: stringOrNull(province),
    postalCode: stringOrNull(code_postal)
  }
})

module.exports = transformed

// "id_evenement": 1003,
// "id_type": "2",
// "description": null,
// "id_adresse": null,
// "id_precision": "0",
// "latitude": 45.692870,
// "longitude": -73.096410,
// "no_civique": null,
// "route": null,
// "appartement": null,
// "intersection": null,
// "id_muni": 54035,
// "municipalite": null,
// "province": null,
// "code_postal": null