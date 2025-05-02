import { describe } from 'node:test'
import { expect, test } from 'vitest'
import {
  canUserSubmitEvent, canUserSubmitInProgram, canUserViewProgram, isUserAdmin,
  userCanAddAnalysis,
  userCanAddSpecimen,
  userCanDeleteAnalysis,
  userCanDeleteSpecimen,
  userCanEditEventSection,
  userCanEditSpecimenSection,
  userCanViewEventSection, userCanViewSpecimenSection,
} from '.'

test('isUserAdmin', () => {
  const adminUser = { isAdmin: true }
  expect(isUserAdmin(adminUser)).toBe(true)

  const normalUser = { isAdmin: false }
  expect(isUserAdmin(normalUser)).toBe(false)

  const noUser = null
  expect(isUserAdmin(noUser)).toBe(false)
})

describe('canUserSubmitEvent', () => {
  test('when user is admin', () => {
    const adminUserWithNoPermissions = { isAdmin: true, permissions: [] }
    expect(canUserSubmitEvent(adminUserWithNoPermissions)).toBe(false)

    const adminUserWithNoSubmitPermisssions = { isAdmin: true, permissions: [{ canSubmit: false }, { canSubmit: false }]}
    expect(canUserSubmitEvent(adminUserWithNoSubmitPermisssions)).toBe(false)

    const adminUserWitSubmitPermisssions = { isAdmin: true, permissions: [{ canSubmit: true }, { canSubmit: false }] }
    expect(canUserSubmitEvent(adminUserWitSubmitPermisssions)).toBe(true)
  })

  test('when user is NOT admin', () => {
    const userWithNoPermissions = { isAdmin: false, permissions: [] }
    expect(canUserSubmitEvent(userWithNoPermissions)).toBe(false)

    const userWithNoSubmitPermisssions = { isAdmin: false, permissions: [{ canSubmit: false }, { canSubmit: false }]}
    expect(canUserSubmitEvent(userWithNoSubmitPermisssions)).toBe(false)

    const userWitSubmitPermisssions = { isAdmin: false, permissions: [{ canSubmit: true }, { canSubmit: false }] }
    expect(canUserSubmitEvent(userWitSubmitPermisssions)).toBe(true)
  
    const noUser = null
    expect(canUserSubmitEvent(noUser)).toBe(false)
  })
})


describe('canUserViewProgram', () => {
  test('when user is admin', () => {
    const adminUserWithPrograms = { isAdmin: true, permissions: [{ programId: 1, role: 'gestion' }, { programId: 2, role: 'gestion' }] }
    expect(canUserViewProgram(adminUserWithPrograms, 1)).toBe(true)
    expect(canUserViewProgram(adminUserWithPrograms, 3)).toBe(false)

    const adminUserWithoutPrograms = { isAdmin: true, permissions: [] }
    expect(canUserViewProgram(adminUserWithoutPrograms, 1)).toBe(false)
    expect(canUserViewProgram(adminUserWithPrograms, 3)).toBe(false)
  })

  test('when user is NOT admin', () => {
    const userWithPrograms = { isAdmin: false, permissions: [{ programId: 1, role: 'gestion' }, { programId: 2, role: 'gestion' }] }
    expect(canUserViewProgram(userWithPrograms, 1)).toBe(true)
    expect(canUserViewProgram(userWithPrograms, 3)).toBe(false)

    const userWithoutPrograms = { isAdmin: false, permissions: [] }
    expect(canUserViewProgram(userWithoutPrograms, 1)).toBe(false)
    expect(canUserViewProgram(userWithoutPrograms, 3)).toBe(false)

    const noUser = null
    expect(canUserViewProgram(noUser, 1)).toBe(false)
  })
})

describe('canUserSubmitInProgram', () => {
  test('when user is admin', () => {
    const adminUserWithSubmitPermissions = { isAdmin: true, permissions: [{ programId: 1, canSubmit: false }, { programId: 2, canSubmit: true }] }
    expect(canUserSubmitInProgram(adminUserWithSubmitPermissions, 1)).toBe(false)
    expect(canUserSubmitInProgram(adminUserWithSubmitPermissions, 2)).toBe(true)

    const adminUserWithoutSubmitPermissions = { isAdmin: true, permissions: [] }
    expect(canUserSubmitInProgram(adminUserWithoutSubmitPermissions, 1)).toBe(false)
  })

  test('when user is NOT admin', () => {
    const userWithSubmitPermissions = { isAdmin: false, permissions: [{ programId: 1, canSubmit: false }, { programId: 2, canSubmit: true }] }
    expect(canUserSubmitInProgram(userWithSubmitPermissions, 1)).toBe(false)
    expect(canUserSubmitInProgram(userWithSubmitPermissions, 2)).toBe(true)

    const userWithoutSubmitPermissions = { isAdmin: false, permissions: [] }
    expect(canUserSubmitInProgram(userWithoutSubmitPermissions, 1)).toBe(false)

    const noUser = null
    expect(canUserSubmitInProgram(noUser, 1)).toBe(false)
  })
})

// soumissionnaire
// gestion
// laboratoire
// consultation

test('canUserViewEventSectionInProgram', () => {
  const noUser = null
  expect(userCanViewEventSection(noUser, 1)).toBe(false)

  const userWithViewPermissions = { isAdmin: false, permissions: [ { programId: 1 }, { programId: 2, role: 'consultation' }, { programId: 3, role: 'laboratoire' }, { programId: 4, role: 'gestion' }, { programId: 5, role: 'soumissionnaire' }] }
  expect(userCanViewEventSection(userWithViewPermissions, 1)).toBe(false)
  expect(userCanViewEventSection(userWithViewPermissions, 2)).toBe(true)
  expect(userCanViewEventSection(userWithViewPermissions, 3)).toBe(true)
  expect(userCanViewEventSection(userWithViewPermissions, 4)).toBe(true)
  expect(userCanViewEventSection(userWithViewPermissions, 5)).toBe(true)
})

test('canUserEditEventSectionInProgram', () => {
  const noUser = null
  expect(userCanEditEventSection(noUser, 1)).toBe(false)

  const userWithEditPermissions = { isAdmin: false, permissions: [ { programId: 1 }, { programId: 2, role: 'consultation' }, { programId: 3, role: 'laboratoire' }, { programId: 4, role: 'gestion' }, { programId: 5, role: 'soumissionnaire' }] }
  expect(userCanEditEventSection(userWithEditPermissions, 1)).toBe(false)
  expect(userCanEditEventSection(userWithEditPermissions, 2)).toBe(false)
  expect(userCanEditEventSection(userWithEditPermissions, 3)).toBe(true)
  expect(userCanEditEventSection(userWithEditPermissions, 4)).toBe(true)
  expect(userCanEditEventSection(userWithEditPermissions, 5)).toBe(true)
})


test('canUserViewSpecimenSectionInProgram', () => {
  const noUser = null
  expect(userCanViewSpecimenSection(noUser, 1)).toBe(false)

  const userWithViewPermissions = { isAdmin: false, permissions: [ { programId: 1 }, { programId: 2, role: 'consultation' }, { programId: 3, role: 'laboratoire' }, { programId: 4, role: 'gestion' }, { programId: 5, role: 'soumissionnaire' }] }
  expect(userCanViewSpecimenSection(userWithViewPermissions, 1)).toBe(false)
  expect(userCanViewSpecimenSection(userWithViewPermissions, 2)).toBe(true)
  expect(userCanViewSpecimenSection(userWithViewPermissions, 3)).toBe(true)
  expect(userCanViewSpecimenSection(userWithViewPermissions, 4)).toBe(true)
  expect(userCanViewSpecimenSection(userWithViewPermissions, 5)).toBe(true)
})

test('canUserEditSpecimenSectionInProgram', () => {
  const noUser = null
  expect(userCanEditSpecimenSection(noUser, 1)).toBe(false)

  const userWithEditPermissions = { isAdmin: false, permissions: [ { programId: 1 }, { programId: 2, role: 'consultation' }, { programId: 3, role: 'laboratoire' }, { programId: 4, role: 'gestion' }, { programId: 5, role: 'soumissionnaire' }] }
  expect(userCanEditSpecimenSection(userWithEditPermissions, 1)).toBe(false)
  expect(userCanEditSpecimenSection(userWithEditPermissions, 2)).toBe(false)
  expect(userCanEditSpecimenSection(userWithEditPermissions, 3)).toBe(true)
  expect(userCanEditSpecimenSection(userWithEditPermissions, 4)).toBe(true)
  expect(userCanEditSpecimenSection(userWithEditPermissions, 5)).toBe(true)
})

test('canUserAddSpecimenInProgram', () => {
  const noUser = null
  expect(userCanAddSpecimen(noUser, 1)).toBe(false)

  const userWithEditPermissions = { isAdmin: false, permissions: [ { programId: 1 }, { programId: 2, role: 'consultation' }, { programId: 3, role: 'laboratoire' }, { programId: 4, role: 'gestion' }, { programId: 5, role: 'soumissionnaire' }] }
  expect(userCanAddSpecimen(userWithEditPermissions, 1)).toBe(false)
  expect(userCanAddSpecimen(userWithEditPermissions, 2)).toBe(false)
  expect(userCanAddSpecimen(userWithEditPermissions, 3)).toBe(true)
  expect(userCanAddSpecimen(userWithEditPermissions, 4)).toBe(true)
  expect(userCanAddSpecimen(userWithEditPermissions, 5)).toBe(true)
})

test('canUserDeleteSpecimenInProgram', () => {
  const noUser = null
  expect(userCanDeleteSpecimen(noUser, 1)).toBe(false)

  const userWithEditPermissions = { isAdmin: false, permissions: [ { programId: 1 }, { programId: 2, role: 'consultation' }, { programId: 3, role: 'laboratoire' }, { programId: 4, role: 'gestion' }, { programId: 5, role: 'soumissionnaire' }] }
  expect(userCanDeleteSpecimen(userWithEditPermissions, 1)).toBe(false)
  expect(userCanDeleteSpecimen(userWithEditPermissions, 2)).toBe(false)
  expect(userCanDeleteSpecimen(userWithEditPermissions, 3)).toBe(false)
  expect(userCanDeleteSpecimen(userWithEditPermissions, 4)).toBe(true)
  expect(userCanDeleteSpecimen(userWithEditPermissions, 5)).toBe(false)
})

test('canUserAddAnalysisInProgram', () => {
  const noUser = null
  expect(userCanAddAnalysis(noUser, 1)).toBe(false)

  const userWithEditPermissions = { isAdmin: false, permissions: [ { programId: 1 }, { programId: 2, role: 'consultation' }, { programId: 3, role: 'laboratoire' }, { programId: 4, role: 'gestion' }, { programId: 5, role: 'soumissionnaire' }] }
  expect(userCanAddAnalysis(userWithEditPermissions, 1)).toBe(false)
  expect(userCanAddAnalysis(userWithEditPermissions, 2)).toBe(false)
  expect(userCanAddAnalysis(userWithEditPermissions, 3)).toBe(true)
  expect(userCanAddAnalysis(userWithEditPermissions, 4)).toBe(true)
  expect(userCanAddAnalysis(userWithEditPermissions, 5)).toBe(false)
})

test('canUserDeleteAnalysisInProgram', () => {
  const noUser = null
  expect(userCanDeleteAnalysis(noUser, 1)).toBe(false)

  const userWithEditPermissions = { isAdmin: false, permissions: [ { programId: 1 }, { programId: 2, role: 'consultation' }, { programId: 3, role: 'laboratoire' }, { programId: 4, role: 'gestion' }, { programId: 5, role: 'soumissionnaire' }] }
  expect(userCanDeleteAnalysis(userWithEditPermissions, 1)).toBe(false)
  expect(userCanDeleteAnalysis(userWithEditPermissions, 2)).toBe(false)
  expect(userCanDeleteAnalysis(userWithEditPermissions, 3)).toBe(false)
  expect(userCanDeleteAnalysis(userWithEditPermissions, 4)).toBe(true)
  expect(userCanDeleteAnalysis(userWithEditPermissions, 5)).toBe(false)
})