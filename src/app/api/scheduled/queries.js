import { Prisma } from '@prisma/client'

import orm from '@/lib/data/database'

const TEMP_TABLE_NAME = 'mapapbulkinsert'

const dropTempTableQuery = orm.$executeRaw`DROP TABLE IF EXISTS ${Prisma.raw(TEMP_TABLE_NAME)};`

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
    affectedSpecie1Id,
    affectedSpecie1AliveCount,
    affectedSpecie1UnhealtyCount,
    affectedSpecie1DeadCount,
    createdById
  FROM ${Prisma.raw(TEMP_TABLE_NAME)};
`

const getInsertQuery = (data) => {
  const values = Prisma.join(data.map(d => {
    // console.debug(d)
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
      affectedSpecie1Id,
      affectedSpecie1AliveCount,
      affectedSpecie1UnhealtyCount,
      affectedSpecie1DeadCount,
      createdById
    ) VALUES ${values};
  `

  return insertQuery
}

export {
  dropTempTableQuery,
  createTempTableQuery,
  getInsertQuery,
  selectFromTempTableQuery
}