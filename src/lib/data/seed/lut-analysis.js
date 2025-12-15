const { stringOrNull, stringToBool, dateOrNull, parseIntegerOrNull } = require('./utils')

const source = require('./sources/lut_analyse.json')

const transformed = source.map(p => {
  const { 
    id, nom, code, actif,
    precision,
    unite,
    borne_inf,
    borne_sup,
    valeur_defaut,
    partage,
    id_groupe_analyse,
    id_type_resultat
   } = p
  return {
    id: parseIntegerOrNull(id),
    name: nom.trim().replaceAll("''", "'"),
    code: code?.trim().replaceAll("''", "'"),
    isActive: stringToBool(actif),
    precision: parseIntegerOrNull(precision),
    unit: unite?.trim().replaceAll("''", "'"),
    lowerLimit: parseFloat(borne_inf),
    upperLimit: parseFloat(borne_sup),
    defaultValue: stringOrNull(valeur_defaut),
    isShared: stringToBool(partage),

    analysisGroupId: parseIntegerOrNull(id_groupe_analyse),
    resultTypeId: parseIntegerOrNull(id_type_resultat)
  }
})

module.exports = transformed
