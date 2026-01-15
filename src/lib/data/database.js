// NOTE : this file uses CommonJS syntax for imports/exports
// because it is used on it's own to seed the database outside NextJS context
// DO NOT CHANGE !!

const { PrismaClient } = require('@prisma/client')

const { NODE_ENV } = process.env

const DEFAULT_TRANSACTION_OPTIONS = {
  maxWait: 5000, // default: 2000
  timeout: 10000 // default: 5000,
  // isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, read_uncommitted is the default defined by postgresql
}

let orm = null

const config = {
  transactionOptions: DEFAULT_TRANSACTION_OPTIONS
}

const prisma = new PrismaClient(config)

if (NODE_ENV === 'production') {
  orm = prisma
} else {
  if (!global.orm) {
    global.orm = prisma
  }
  orm = global.orm
}

module.exports = orm
