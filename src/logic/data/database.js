import { PrismaClient } from '@prisma/client'

// import { database as baseConfig } from '../config'

const { NODE_ENV } = process.env
// const { databaseUrl, ...rest } = baseConfig

const DEFAULT_TRANSACTION_OPTIONS = {
  maxWait: 5000, // default: 2000
  timeout: 10000, // default: 5000,
  // isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, read_uncommitted is the default defined by postgresql
}

let orm = null

const config = { 
  // ...rest,
  ...{
    // datasources: {
    //   db: {
    //     url: databaseUrl
    //   }
    // },
    transactionOptions: DEFAULT_TRANSACTION_OPTIONS
  }
}

const prismaClient = new PrismaClient(config)

if (NODE_ENV === 'production') {
  orm = prismaClient
} else {
  if (!global.orm) {
    global.orm = prismaClient
  }
  orm = global.orm
}

export default orm
