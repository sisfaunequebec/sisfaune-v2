import { Prisma } from '@prisma/client'

const isNil = require('lodash.isnil')

import { revalidatePath } from 'next/cache'

import orm from '@/lib/data/database'

import getToday from './get-today'

import {
  dropTempTableQuery,
  dropInsertTableQuery,
  createTempTableQuery,
  createInsertTableQuery,
  getLoadTempQuery,
  intermediateQuery,
  insertQuery,
  updateLocationQuery
} from './queries'

const TEMP_TABLE_NAME = 'mapapbulkinsert'

const SPECIES_MAP = {
  1: 777, // raton laveur 
  2: 571, // mouffette rayée
  3: 781, // renard roux
  4: 180, // chauve-souris inconnue
  5: 231, // coyote
  6: 471  // loup grid
}

const getAffect1Mort = (row) => {
  const { animalMort, nbreAnimal } = row
  return animalMort === 2 ? nbreAnimal : null
}

const getAffect1Malade = (row) => {
  const { animalMort, nbreAnimal, nuisible } = row
  return (animalMort === 1 && isNil(nuisible)) ? nbreAnimal : null
}

const getAffect1Vivant = (row) => {
  const { animalMort, nbreAnimal, nuisible } = row
  return (animalMort === 1 && nuisible === 1) ? nbreAnimal : null
}

const insertData = async (data) => {

  try {
    const statuses = await orm.LutEventStatus.findMany() // mssql.query`SELECT * FROM lut_evenement_statut;`

    const statusesByCode = statuses.reduce((acc, s) => {
      const { code_mapaq } = s
      acc[code_mapaq] = s
      return acc
    }, {})

    const adminUser = await orm.User.findFirst({ where: { username: 'admin' } }) // mssql.query`SELECT * FROM aspnet_users WHERE username = 'Admin';`
    const { id: adminUserId } = adminUser

    const dataToInsert = data.map(r => {
      const { pk, noMapaq, statut, dateCreation, dateDecouverte, latitude, longitude, identAnimal } = r
      const { comportement, comportement2, commentaires, commentaires2, raison } = r

      const sourcePk = parseInt(pk, 10)
      const idStatut = statusesByCode[statut] ? statusesByCode[statut].id : 2
      const affect1Espece = SPECIES_MAP[identAnimal] || null
      const metaCreationPar = adminUserId
      const source = `mapaq_volet_4_${getToday()}`

      return {
        sourcePk,
        source,
        mapaqId: noMapaq,
        statusId: idStatut,
        reportedAt: dateCreation,
        discoveredAt: dateDecouverte,
        reportOriginId: 9, // signalement d'un citoyen
        programId: 4, // surveillance de la rage du raton laveur
        observations: [comportement, comportement2, commentaires, commentaires2, raison].filter(Boolean).join(' // '),
        latitude,
        longitude,
        idMuni: null, // on laisse tomber le code de municipalité du MAPAQ (avant fusions)  
        affectedSpecie1Id: affect1Espece,
        affectedSpecie1AliveCount: getAffect1Vivant(r), // (animalMort === 1 && nuisible === 1) ? nbreAnimal : null,
        affectedSpecie1UnhealtyCount: getAffect1Malade(r), // (animalMort === 1 && isNil(nuisible)) ? nbreAnimal : null,
        affectedSpecie1DeadCount: getAffect1Mort(r), // animalMort === 2 ? nbreAnimal : null,
        createdById: metaCreationPar
      }
    })

    const results = await orm.$transaction([
      // drop temp tables
      dropTempTableQuery,
      dropInsertTableQuery,
      // recreate temp tables
      createTempTableQuery,
      createInsertTableQuery,
      // bulk load from csv
      getLoadTempQuery(dataToInsert),
      // filter out existing rows
      intermediateQuery,
      // insert
      insertQuery,
      // update location coordinates
      updateLocationQuery
    ])

    console.debug('Done inserting data', results)

    // throw new Error('shit')

    return {
      data: results,
      error: null
    }

  } catch (err) {
    // console.error('Insert data error :', err)

    return {
      data: null,
      error: err
    }
  }

}

export default insertData
