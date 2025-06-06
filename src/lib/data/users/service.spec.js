import { describe } from 'node:test'
import { beforeEach, test, expect, vi } from 'vitest'

import bcrypt from 'bcrypt'

vi.mock('server-only', () => {
  return {
    // mock server-only module
  }
})

// import orm from './database'
import { buildCreateUserPayload, createUser } from './service'

describe('api:users', () => {

  describe('create', () => {
  
    test('build payload returns correct data', async () => {
      const input = { 
        firstName: 'Bruno',
        lastName: 'Gendron',
        email: 'bruno.gendron.consult@gmail.com',
        password: '123456'
      }
      const payload = await buildCreateUserPayload(input)
      const { username, password, hash } = payload
      expect(username).toBe('bruno-gendron')
      expect(await bcrypt.compare(password, hash)).toBe(true)
      await createUser(input)
    })

  })
})
