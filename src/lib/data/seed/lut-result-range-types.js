const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull } = require('./utils')

const source = require('./sources/lut_type_resultat_plage.json')

const transformed = source.map(p => {
  const { 
    id_type_resultat_plage, 
    id_type_resultat, 
    type_nombre,
    precision,
    unite,
    borne_inf,
    borne_sup,
    valeur_defaut
  } = p

  return {
    id: parseIntegerOrNull(id_type_resultat_plage),
    resultTypeId: parseIntegerOrNull(id_type_resultat),
    precision: parseIntegerOrNull(precision),
    unit: unite?.trim().replaceAll("''", "'"),
    lowerLimit: parseFloat(borne_inf),
    upperLimit: parseFloat(borne_sup),
    defaultvalue: valeur_defaut?.trim().replaceAll("''", "'"),
  }
})

module.exports = transformed
