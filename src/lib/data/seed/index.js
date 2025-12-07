const orm = require('../database')

const doSeed = require('./do-seed')

doSeed(orm)
  .then(async () => {
    await orm.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await orm.$disconnect()
    process.exit(1)
  })


