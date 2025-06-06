import { describe } from 'node:test'
import { beforeEach, test, expect } from 'vitest'

import orm from './database'
import { resetDatabase } from './utils/test/reset-database'

const ADMIN_USER = { 
  id: 'admin',
  username: 'admin',
  email: 'admin@sisfaunequebec.ca',
  password: '123456',
}

// const prepareDatabase = async () => {
//   await orm.user.createMany({ data: [ADMIN_USER] })
// }

beforeEach(async () => {
  await resetDatabase()
  // await prepareDatabase()
})

describe('database:static', () => {

  describe('events', () => {
  
    test('event deletion cascades to specimens', async () => {

      // Arrange
      await orm.user.createMany({ data: [ADMIN_USER] })
      await orm.event.createMany({
        data: {
          id: 1,
          reportOriginId: 1,
          submitterId: 'admin'
        }
      })

      await orm.specimen.createMany({
        data: {
          id: 1,
          sequenceId: 1,
          eventId: 1
        }
      })

      await expect(orm.specimen.count()).resolves.toBe(1)
      await orm.event.deleteMany()
      await expect(orm.specimen.count()).resolves.toBe(0)
    })

  })
})
