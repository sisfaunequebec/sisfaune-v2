import { expect, test } from 'vitest'
import { isUserAdmin, canUserSubmitEvent, canUserViewProgram, canUserSubmitInProgram } from '.'

test('isUserAdmin', () => {
  const adminUser = { isAdmin: true }
  expect(isUserAdmin(adminUser)).toBe(true)

  const normalUser = { isAdmin: false }
  expect(isUserAdmin(normalUser)).toBe(false)

  const noUser = null
  expect(isUserAdmin(noUser)).toBe(false)
})

test('canUserSubmitEvent', () => {
  const adminUser = { isAdmin: true, permissions: [{ canSubmit: false }, { canSubmit: false }]}
  expect(canUserSubmitEvent(adminUser)).toBe(false)

  const minimalUser = { isAdmin: false, permissions: [] }
  expect(canUserSubmitEvent(minimalUser)).toBe(false)

  const normalUser = { isAdmin: false, permissions: [{ canSubmit: true }, { canSubmit: false }] }
  expect(canUserSubmitEvent(normalUser)).toBe(true)

  const normalUserWithNoSubmitPermission = { isAdmin: false, permissions: [{ canSubmit: false }, { canSubmit: false }] }
  expect(canUserSubmitEvent(normalUserWithNoSubmitPermission)).toBe(false)

  const noUser = null
  expect(canUserSubmitEvent(noUser)).toBe(false)
})

test('canUserViewProgram', () => {
  const adminUser = { isAdmin: true, permissions: [{ programId: 1, role: 'gestion' }, { programId: 2, role: 'gestion' }] }
  expect(canUserViewProgram(adminUser, 1)).toBe(true)

  const minimalUser = { isAdmin: false, permissions: [] }
  expect(canUserViewProgram(minimalUser, 1)).toBe(false)

  const normalUser = { isAdmin: false, permissions: [{ programId: 1, role: 'gestion' }] }
  expect(canUserViewProgram(normalUser, 1)).toBe(true)
  expect(canUserViewProgram(normalUser, 2)).toBe(false)
})

test('canUserSubmitInProgram', () => {
  const adminUser = { isAdmin: true, permissions: [{ programId: 1, canSubmit: false }, { programId: 2, canSubmit: true }] }
  expect(canUserSubmitInProgram(adminUser, 1)).toBe(false)
  expect(canUserSubmitInProgram(adminUser, 2)).toBe(true)

  const minimalUser = { isAdmin: false, permissions: [] }
  expect(canUserSubmitInProgram(minimalUser, 1)).toBe(false)

  const normalUser = { isAdmin: false, permissions: [{ programId: 1, canSubmit: true }] }
  expect(canUserSubmitInProgram(normalUser, 1)).toBe(true)
  expect(canUserSubmitInProgram(normalUser, 2)).toBe(false)
})