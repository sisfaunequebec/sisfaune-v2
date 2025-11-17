import { Prisma } from '@prisma/client'

const isNil = require('lodash.isnil')

import orm from '@/lib/data/database'

import getToday from './get-today'

import {
  dropTempTableQuery,
  createTempTableQuery,
  getInsertQuery,
  selectFromTempTableQuery
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
        // idMuni: null, // on laisse tomber le code de municipalité du MAPAQ (avant fusions)  
        affectedSpecie1Id: affect1Espece,
        affectedSpecie1AliveCount: getAffect1Vivant(r), // (animalMort === 1 && nuisible === 1) ? nbreAnimal : null,
        affectedSpecie1UnhealtyCount: getAffect1Malade(r), // (animalMort === 1 && isNil(nuisible)) ? nbreAnimal : null,
        affectedSpecie1DeadCount: getAffect1Mort(r), // animalMort === 2 ? nbreAnimal : null,
        createdById: metaCreationPar
      }
    })

    // console.debug('here')

    const results = await orm.$transaction([
      dropTempTableQuery,
      createTempTableQuery,
      getInsertQuery(dataToInsert),
      selectFromTempTableQuery
    ])

    // console.debug('results', results)

    // transaction = await new mssql.Transaction()
    // await transaction.begin()

    // // Create temporary table...

    // const table = await new mssql.Table('#mapaqbulkinsert')
    // table.create = true

    // table.columns.add('pk_source', mssql.Int, { nullable: false })
    // table.columns.add('source', mssql.NVarChar(50), { nullable: true })
    // table.columns.add('no_mapaq', mssql.NVarChar(50), { nullable: true })
    // table.columns.add('id_statut', mssql.TinyInt, { nullable: false })
    // table.columns.add('date_signalement', mssql.SmallDateTime, { nullable: true })
    // table.columns.add('date_decouverte', mssql.SmallDateTime, { nullable: true })
    // table.columns.add('id_provenance_signalement', mssql.TinyInt, { nullable: false })
    // table.columns.add('id_programme', mssql.TinyInt, { nullable: false })
    // table.columns.add('observations', mssql.NVarChar(mssql.MAX), { nullable: true })
    // table.columns.add('latitude', mssql.Numeric(18, 6), { nullable: true })
    // table.columns.add('longitude', mssql.Numeric(18, 6), { nullable: true })
    // table.columns.add('id_muni', mssql.NVarChar(50), { nullable: true })
    // table.columns.add('affect1_espece', mssql.SmallInt, { nullable: true })
    // table.columns.add('affect1_vivant', mssql.SmallInt, { nullable: true })
    // table.columns.add('affect1_malade', mssql.SmallInt, { nullable: true })
    // table.columns.add('affect1_mort', mssql.SmallInt, { nullable: true })
    // table.columns.add('meta_creation_par', mssql.UniqueIdentifier, { nullable: true })

    // // Insert into temporary table...

    // dataToInsert.forEach(r => {
    //   const { 
    //     pkSource, source, noMapaq, idStatut, dateSignalement, dateDecouverte, 
    //     idProvenanceSignalement, idProgramme, observations, latitude, longitude,
    //     idMuni, affect1Espece, affect1Vivant, affect1Malade, affect1Mort, metaCreationPar
    //   } = r
    //   table.rows.add(pkSource, source, noMapaq, idStatut, dateSignalement, dateDecouverte, 
    //     idProvenanceSignalement, idProgramme, observations, latitude, longitude,
    //     idMuni, affect1Espece, affect1Vivant, affect1Malade, affect1Mort, metaCreationPar
    //   )
    // })

    // const insertRequest = await new mssql.Request(transaction)
    // await insertRequest.bulk(table)

    // // Insert into events table and update
    // // skipping records already present

    // const updateRequest = await new mssql.Request(transaction)
    // const updateResult = await updateRequest.query(
    //   `
    //   DECLARE @inserted TABLE (pk_source INT, id_evenement INT);
    //   INSERT INTO dbo.evenement (pk_source, source, no_mapaq, id_statut, date_signalement, date_decouverte, id_provenance_signalement, id_programme, observations, affect1_espece, affect1_vivant, affect1_malade, affect1_mort, id_soumissionnaire, meta_creation_par) OUTPUT inserted.pk_source, inserted.id_evenement INTO @inserted SELECT pk_source, source, no_mapaq, id_statut, date_signalement, date_decouverte, id_provenance_signalement, id_programme, observations, affect1_espece, affect1_vivant, affect1_malade, affect1_mort, meta_creation_par AS id_soumissionnaire, meta_creation_par FROM #mapaqbulkinsert WHERE NOT EXISTS (SELECT no_mapaq FROM evenement WHERE no_mapaq = #mapaqbulkinsert.no_mapaq);
    //   UPDATE dbo.localisation SET latitude = bk.latitude, longitude = bk.longitude, id_muni = bk.id_muni FROM dbo.localisation l INNER JOIN @inserted i ON l.id_evenement = i.id_evenement INNER JOIN #mapaqbulkinsert bk ON (i.pk_source = bk.pk_source);
    //   `
    // )

    // const { rowsAffected } = updateResult
    // const [ insertedRows, ...rest ] = rowsAffected

    // // console.debug(updateResult)

    // await transaction.commit()
    // await conn.close()

    return {
      data: results,
      error: null
    }

  } catch (err) {
    console.error('Insert data error :', err)

    return {
      data: null,
      error: err
    }
  }

}

export default insertData
