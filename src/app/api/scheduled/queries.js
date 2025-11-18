import { Prisma } from '@prisma/client'

import orm from '@/lib/data/database'

const TEMP_TABLE_NAME = 'mapapbulkload'
const INSERT_TABLE_NAME = 'mapapbulkinsert'

const dropTempTableQuery = orm.$executeRaw`DROP TABLE IF EXISTS ${Prisma.raw(TEMP_TABLE_NAME)};`
const dropInsertTableQuery = orm.$executeRaw`DROP TABLE IF EXISTS ${Prisma.raw(INSERT_TABLE_NAME)};`

const createTempTableQuery = orm.$executeRaw`
  CREATE TEMPORARY TABLE ${Prisma.raw(TEMP_TABLE_NAME)} (
    sourcePk INT NOT NULL,
    source VARCHAR(50),
    mapaqId VARCHAR(50),
    statusId INT NOT NULL,
    reportedAt TEXT,
    discoveredAt TEXT,
    reportOriginId INT NOT NULL,
    programId INT NOT NULL,
    observations TEXT,
    latitude NUMERIC(18, 6),
    longitude NUMERIC(18, 6),
    muniId TEXT,
    affectedSpecie1Id INT,
    affectedSpecie1AliveCount INT,
    affectedSpecie1UnhealtyCount INT,
    affectedSpecie1DeadCount INT,
    createdById TEXT
  );
`
const createInsertTableQuery = orm.$executeRaw`
  CREATE TEMPORARY TABLE ${Prisma.raw(INSERT_TABLE_NAME)} (
    sourcePk INT NOT NULL,
    source VARCHAR(50),
    mapaqId VARCHAR(50),
    statusId INT NOT NULL,
    reportedAt TEXT,
    discoveredAt TEXT,
    reportOriginId INT NOT NULL,
    programId INT NOT NULL,
    observations TEXT,
    latitude NUMERIC(18, 6),
    longitude NUMERIC(18, 6),
    muniId TEXT,
    affectedSpecie1Id INT,
    affectedSpecie1AliveCount INT,
    affectedSpecie1UnhealtyCount INT,
    affectedSpecie1DeadCount INT,
    createdById TEXT
  );
`

const selectFromTempTableQuery = orm.$executeRaw`
  SELECT 
    sourcePk,
    source,
    mapaqId,
    statusId,
    reportedAt,
    discoveredAt,
    reportOriginId,
    programId,
    observations,
    latitude,
    longitude,
    muniId,
    affectedSpecie1Id,
    affectedSpecie1AliveCount,
    affectedSpecie1UnhealtyCount,
    affectedSpecie1DeadCount,
    createdById
  FROM ${Prisma.raw(TEMP_TABLE_NAME)};
`

const getLoadTempQuery = (data) => {
  const values = Prisma.join(data.map(d => {
    return Prisma.sql`(${Prisma.join(Object.values(d))})`
  }))

  const insertQuery = orm.$executeRaw`
    INSERT INTO ${Prisma.raw(TEMP_TABLE_NAME)} (
      sourcePk,
      source,
      mapaqId,
      statusId,
      reportedAt,
      discoveredAt,
      reportOriginId,
      programId,
      observations,
      latitude,
      longitude,
      muniId,
      affectedSpecie1Id,
      affectedSpecie1AliveCount,
      affectedSpecie1UnhealtyCount,
      affectedSpecie1DeadCount,
      createdById
    ) VALUES ${values};
  `

  return insertQuery
}

const intermediateQuery = orm.$executeRaw`
  INSERT INTO ${Prisma.raw(INSERT_TABLE_NAME)}
  SELECT *
  FROM ${Prisma.raw(TEMP_TABLE_NAME)} mb
  WHERE NOT EXISTS (
    SELECT 1
    FROM data_evenement e
    WHERE e.no_mapaq = mb.mapaqId
  );
`

const insertQuery = orm.$executeRaw`
  WITH to_insert AS (
    SELECT *
    FROM ${Prisma.raw(INSERT_TABLE_NAME)} mb
    -- WHERE NOT EXISTS (
    --   SELECT 1
    --   FROM data_evenement e
    --   WHERE e.no_mapaq = mb.mapaqId
    -- )
  ),
  inserted AS (
    INSERT INTO data_evenement (
      pk_source,
      source,
      no_mapaq,
      id_statut,
      date_signalement,
      date_decouverte,
      id_provenance_signalement,
      id_programme,
      observations,
      affect1_espece,
      affect1_vivant,
      affect1_malade,
      affect1_mort,
      id_soumissionnaire,
      meta_creation_par
    )
    SELECT
      sourcePk,
      source,
      mapaqId,
      statusId,
      reportedAt::TIMESTAMPTZ,
      discoveredAt::TIMESTAMPTZ,
      reportOriginId,
      programId,
      observations,
      affectedSpecie1Id,
      affectedSpecie1AliveCount,
      affectedSpecie1UnhealtyCount,
      affectedSpecie1DeadCount,
      createdById,
      createdById
    FROM to_insert
    RETURNING id, pk_source
  )

  SELECT * FROM inserted;
`

const updateLocationQuery = orm.$executeRaw`
  WITH to_insert AS (
    SELECT *
    FROM ${Prisma.raw(INSERT_TABLE_NAME)}
  )
  UPDATE data_localisation AS l
  SET 
    latitude = bk.latitude,
    longitude = bk.longitude
  FROM data_evenement AS e
  JOIN to_insert AS bk ON e.pk_source = bk.sourcePk
  WHERE l.id_evenement = e.id;
`

export {
  dropTempTableQuery,
  dropInsertTableQuery,
  createTempTableQuery,
  createInsertTableQuery,
  getLoadTempQuery,
  intermediateQuery,
  insertQuery,
  updateLocationQuery,
  selectFromTempTableQuery
}