const isNil = require('lodash.isnil')
const { parseFile } = require('fast-csv')

const round = (number, decimals) => {
  const factor = Math.pow(10, decimals)
  return Math.round(number * factor) / factor
}

const asInteger = (value) => {
  const result = (isNil(value) || value == '') ? null : parseInt(value, 10)
  return result
}

const asDecimal = (value) => {
  return (isNil(value) || value == '') ? null :  Number(value)
}

const asDate = (value) => {
  return (isNil(value) || value == '') ? null : value
}

const asString = (value) => {
  return (isNil(value) || value == '') ? null : value
}

const processCsvRow = (row) => {
  const {
    PK_REP,
    REP_V_S4_13_LAT,
    REP_V_S4_13_LONG,
    REP_V_S4_8_CD_MUN_COOR,
    REP_V_STATU_SIGNL,
    REP_N_S4_7_IDENT_ANIM_SAU,
    REP_N_S4_7_NBRE_ANIMA,
    REP_N_S4_14_MAL_MORT,
    REP_N_S4_14_INDIC_NUISI,
    REP_D_DATE_CRETN,
    REP_V_NO_SIGN,
    REP_V_S4_15_DESC_DETAILLE,
    REP_V_S4_15_COMP_AUTRE,
    REP_V_S4_16G_COMM_GENERAUX,
    REP_V_S4_19_COMM_GENERAUX,
    REP_V_S4_16G_RAISON,
    REP_D_S4_18_DATE_DECOU
  } = row

  return {
    pk: asString(PK_REP),
    latitude: round(asDecimal(REP_V_S4_13_LAT), 6),
    longitude: round(asDecimal(REP_V_S4_13_LONG),  6),
    muni: asString(REP_V_S4_8_CD_MUN_COOR),
    statut: asString(REP_V_STATU_SIGNL),
    identAnimal: asInteger(REP_N_S4_7_IDENT_ANIM_SAU),
    nbreAnimal: asInteger(REP_N_S4_7_NBRE_ANIMA),
    animalMort: asInteger(REP_N_S4_14_MAL_MORT),
    nuisible: asInteger(REP_N_S4_14_INDIC_NUISI),
    dateCreation: asDate(REP_D_DATE_CRETN),
    noMapaq: asString(REP_V_NO_SIGN),
    comportement: asString(REP_V_S4_15_DESC_DETAILLE),
    comportement2: asString(REP_V_S4_15_COMP_AUTRE),
    commentaires: asString(REP_V_S4_16G_COMM_GENERAUX),
    commentaires2: asString(REP_V_S4_19_COMM_GENERAUX),
    raison: asString(REP_V_S4_16G_RAISON),
    dateDecouverte: asDate(REP_D_S4_18_DATE_DECOU)
  }
}

const PARSE_OPTIONS = {
  headers: true,
  delimiter: '|',
  ignoreEmpty: true,
  trim: true
}

const readCsv = (file) => {
  console.debug(`Parsing ${file}...`)

  return new Promise((resolve, reject) => {
    const data = []

    parseFile(file, PARSE_OPTIONS)
      .on('error', reject)
      .on('data', (row) => {
        const obj = processCsvRow(row)
        if (obj) data.push(obj)
      })
      .on('end', () => {
        console.debug(`Done parsing...`)
        resolve(data)
      })
  })
}

export default readCsv
